use chrono::{DateTime, Duration, Utc};

use super::UserRepository;
use crate::{Database, DbResult};

pub const PASSWORD_ATTEMPT_MAX: u32 = 5;

pub enum PasswordAttemptAdmission<T> {
    Admitted(T),
    RateLimited(DateTime<Utc>),
    Busy,
}

impl UserRepository {
    /// Reserve before hashing so concurrent requests share the account's limit.
    /// Rows belong to real accounts, survive process restarts, and are never
    /// evicted by arbitrary anonymous usernames or source addresses.
    pub async fn reserve_password_attempt(
        &self,
        user_id: &str,
        scope: &str,
        now: DateTime<Utc>,
    ) -> DbResult<Option<DateTime<Utc>>> {
        match self
            .reserve_password_attempt_with_admission(user_id, scope, now, || Some(()))
            .await?
        {
            PasswordAttemptAdmission::Admitted(()) => Ok(None),
            PasswordAttemptAdmission::RateLimited(until) => Ok(Some(until)),
            PasswordAttemptAdmission::Busy => unreachable!("unconditional password admission"),
        }
    }

    /// Acquire database locks before asking the caller for a hashing worker.
    /// Admission must be synchronous and nonblocking. A busy caller rolls back
    /// without advancing attempts; an admitted worker is returned after commit.
    pub async fn reserve_password_attempt_with_admission<T>(
        &self,
        user_id: &str,
        scope: &str,
        now: DateTime<Utc>,
        admit: impl FnOnce() -> Option<T>,
    ) -> DbResult<PasswordAttemptAdmission<T>> {
        let reset_at = now + Duration::minutes(15);
        macro_rules! reserve {
            ($begin:expr, $insert:expr, $select:expr, $update:expr) => {{
                let mut tx = $begin.await?;
                sqlx::query($insert)
                    .bind(user_id)
                    .bind(scope)
                    .bind(reset_at)
                    .execute(&mut *tx)
                    .await?;
                let (attempts, old_reset, blocked): (i64, DateTime<Utc>, Option<DateTime<Utc>>) =
                    sqlx::query_as($select)
                        .bind(user_id)
                        .bind(scope)
                        .fetch_one(&mut *tx)
                        .await?;
                if old_reset > now {
                    if let Some(until) = blocked.filter(|until| *until > now) {
                        tx.commit().await?;
                        return Ok(PasswordAttemptAdmission::RateLimited(until.min(old_reset)));
                    }
                }
                let Some(worker) = admit() else {
                    tx.rollback().await?;
                    return Ok(PasswordAttemptAdmission::Busy);
                };
                let attempts = if old_reset <= now {
                    1
                } else {
                    attempts.saturating_add(1)
                };
                let reset = if old_reset <= now {
                    reset_at
                } else {
                    old_reset
                };
                let blocked = (attempts >= i64::from(PASSWORD_ATTEMPT_MAX)).then(|| {
                    let overage = (attempts - i64::from(PASSWORD_ATTEMPT_MAX)).min(8) as u32;
                    now + Duration::seconds((60 * 2_i64.pow(overage)).min(900))
                });
                sqlx::query($update)
                    .bind(attempts)
                    .bind(reset)
                    .bind(blocked)
                    .bind(user_id)
                    .bind(scope)
                    .execute(&mut *tx)
                    .await?;
                tx.commit().await?;
                Ok(PasswordAttemptAdmission::Admitted(worker))
            }};
        }
        match &self.database {
            Database::Sqlite(pool) => reserve!(pool.begin_with("BEGIN IMMEDIATE"),
                "INSERT INTO auth_password_attempts (user_id, scope, reset_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING",
                "SELECT attempts, reset_at, blocked_until FROM auth_password_attempts WHERE user_id = ? AND scope = ?",
                "UPDATE auth_password_attempts SET attempts = ?, reset_at = ?, blocked_until = ? WHERE user_id = ? AND scope = ?"),
            Database::Postgres(pool) => reserve!(pool.begin(),
                "INSERT INTO auth_password_attempts (user_id, scope, reset_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
                "SELECT attempts, reset_at, blocked_until FROM auth_password_attempts WHERE user_id = $1 AND scope = $2 FOR UPDATE",
                "UPDATE auth_password_attempts SET attempts = $1, reset_at = $2, blocked_until = $3 WHERE user_id = $4 AND scope = $5"),
        }
    }

    pub async fn clear_password_attempts(&self, user_id: &str, scope: &str) -> DbResult<()> {
        super::db_execute!(
            &self.database,
            "DELETE FROM auth_password_attempts WHERE user_id = ? AND scope = ?",
            [user_id, scope]
        )?;
        Ok(())
    }
}
