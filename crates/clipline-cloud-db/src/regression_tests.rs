use crate::*;
use chrono::Duration;

#[tokio::test]
async fn sqlite_upgrade_rebuilds_existing_search_candidates_with_unicode_casefolding() {
    let directory = tempfile::tempdir().unwrap();
    let url = format!("sqlite://{}", directory.path().join("upgrade.db").display());
    let options = SqliteConnectOptions::from_str(&url)
        .unwrap()
        .create_if_missing(true);
    let old_pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect_with(options)
        .await
        .unwrap();
    let old_migrations = Migrator {
        migrations: std::borrow::Cow::Owned(
            SQLITE_MIGRATOR
                .iter()
                .filter(|migration| migration.version <= 202610010003)
                .cloned()
                .collect(),
        ),
        ..Migrator::DEFAULT
    };
    old_migrations.run(&old_pool).await.unwrap();
    let now = now_utc();
    sqlx::query("INSERT INTO users (id, username, password_hash, role, is_disabled, created_at, updated_at) VALUES (?, ?, ?, ?, FALSE, ?, ?)")
        .bind("upgrade-user").bind("owner").bind("hash").bind("user").bind(now).bind(now)
        .execute(&old_pool).await.unwrap();
    let old_repos = Repositories::new(Database::Sqlite(old_pool.clone()));
    let mut clip = NewClip::new("upgrade-user", "Über École", "local");
    clip.status = "ready".into();
    let clip = old_repos.clips.create(&clip).await.unwrap();
    let before: (i64,) =
        sqlx::query_as("SELECT COUNT(*) FROM clip_search WHERE clip_search MATCH '\"über\"'")
            .fetch_one(&old_pool)
            .await
            .unwrap();
    assert_eq!(
        before.0, 0,
        "old ASCII tokens miss the lowercase Unicode query"
    );
    old_pool.close().await;

    let database = Database::connect_and_migrate(&url).await.unwrap();
    let repos = Repositories::new(database);
    for query in ["Über", "über", "École", "école"] {
        let rows = repos
            .clips
            .list_for_owner(&ClipListParams {
                owner_user_id: "upgrade-user".into(),
                query: Some(query.into()),
                limit: 10,
                offset: 0,
                game: None,
                game_category_id: None,
                source_type: None,
                visibility: None,
                status: None,
                from: None,
                to: None,
                min_duration_ms: None,
                max_duration_ms: None,
                min_size_bytes: None,
                max_size_bytes: None,
                sort: ClipSort::UploadedAtDesc,
            })
            .await
            .unwrap();
        assert_eq!(
            rows.iter().map(|row| &row.id).collect::<Vec<_>>(),
            vec![&clip.id]
        );
    }
}

#[tokio::test]
async fn account_password_limits_are_atomic_durable_and_separate_from_reauth() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let user = repos
            .users
            .create(&NewUser::new("account", "hash", "user"))
            .await
            .unwrap();
        let now = now_utc();
        for _ in 0..PASSWORD_ATTEMPT_MAX * 2 {
            assert!(matches!(
                repos
                    .users
                    .reserve_password_attempt_with_admission(&user.id, "login", now, || None::<()>,)
                    .await
                    .unwrap(),
                PasswordAttemptAdmission::Busy,
            ));
        }
        let mut attempts = tokio::task::JoinSet::new();
        for _ in 0..12 {
            let users = repos.users.clone();
            let id = user.id.clone();
            attempts.spawn(async move {
                users
                    .reserve_password_attempt(&id, "login", now)
                    .await
                    .unwrap()
            });
        }
        let mut admitted = 0;
        while let Some(result) = attempts.join_next().await {
            admitted += usize::from(result.unwrap().is_none());
        }
        assert_eq!(admitted, PASSWORD_ATTEMPT_MAX as usize);
        assert!(repos
            .users
            .reserve_password_attempt(&user.id, "reauth", now)
            .await
            .unwrap()
            .is_none());
        for _ in 0..PASSWORD_ATTEMPT_MAX * 2 {
            assert!(matches!(
                repos.users.reserve_password_attempt_with_admission(
                    &user.id, "reauth", now, || None::<()>,
                ).await.unwrap(),
                PasswordAttemptAdmission::Busy,
            ));
        }
        for _ in 1..PASSWORD_ATTEMPT_MAX {
            assert!(repos
                .users
                .reserve_password_attempt(&user.id, "reauth", now)
                .await
                .unwrap()
                .is_none());
        }
        assert!(repos
            .users
            .reserve_password_attempt(&user.id, "login", now + Duration::seconds(1))
            .await
            .unwrap()
            .is_some());
        assert!(repos
            .users
            .reserve_password_attempt(&user.id, "login", now + Duration::minutes(16))
            .await
            .unwrap()
            .is_none());
        repos
            .users
            .clear_password_attempts(&user.id, "login")
            .await
            .unwrap();
        assert!(repos
            .users
            .reserve_password_attempt(&user.id, "login", now)
            .await
            .unwrap()
            .is_none());
        repos
            .update_password_and_revoke_credentials(&user.id, "new-hash")
            .await
            .unwrap();
        assert!(repos
            .users
            .reserve_password_attempt(&user.id, "reauth", now)
            .await
            .unwrap()
            .is_none());
    }
}

#[tokio::test]
async fn failed_upload_quota_can_be_released_and_restored_without_losing_diagnostics() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let user = repos
            .users
            .create(&NewUser::new("uploader", "hash", "user"))
            .await
            .unwrap();
        let mut clip = NewClip::new(&user.id, "failed", "local");
        clip.status = "failed".into();
        clip.file_size_bytes = Some(100);
        let clip = repos.clips.create(&clip).await.unwrap();
        let mut session = NewUploadSession::new(
            &clip.id,
            &user.id,
            100,
            "objects/media/token/source.mp4",
            now_utc() + Duration::hours(1),
        );
        session.status = "failed".into();
        session.failure_reason = Some("missing".into());
        let session = repos.upload_sessions.create(&session).await.unwrap();
        assert_eq!(
            repos
                .clips
                .active_storage_bytes_for_owner(&user.id)
                .await
                .unwrap(),
            100
        );
        repos
            .clips
            .release_failed_storage_reservation(&clip.id)
            .await
            .unwrap();
        assert_eq!(
            repos
                .clips
                .active_storage_bytes_for_owner(&user.id)
                .await
                .unwrap(),
            0
        );
        let failed = repos.clips.get(&clip.id).await.unwrap().unwrap();
        assert_eq!(failed.file_size_bytes, Some(100));
        assert_eq!(failed.status, "failed");
        assert!(repos
            .restore_failed_upload_bundle(&session.id, &clip.id, "missing")
            .await
            .unwrap());
        assert_eq!(
            repos
                .clips
                .active_storage_bytes_for_owner(&user.id)
                .await
                .unwrap(),
            100
        );
        repos
            .clips
            .release_failed_storage_reservation(&clip.id)
            .await
            .unwrap();
        assert_eq!(
            repos
                .clips
                .active_storage_bytes_for_owner(&user.id)
                .await
                .unwrap(),
            100
        );
    }
}

async fn backends() -> (tempfile::TempDir, Vec<Database>) {
    let (directory, sqlite) = crate::tests::sqlite_test_database().await;
    let mut databases = vec![sqlite];
    if let Some(postgres) = crate::tests::postgres_test_database().await {
        databases.push(postgres);
    }
    (directory, databases)
}

#[tokio::test]
async fn storage_totals_release_cleaned_failures_and_count_pending_deletions() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let user = repos
            .users
            .create(&NewUser::new("storage-totals", "hash", "user"))
            .await
            .unwrap();
        let mut clips = Vec::new();
        for (status, size) in [("failed", 100), ("deleted", 25), ("ready", 10)] {
            let mut clip = NewClip::new(&user.id, status, "local");
            clip.status = status.into();
            clip.file_size_bytes = Some(size);
            clips.push(repos.clips.create(&clip).await.unwrap());
        }
        assert_eq!(repos.clips.total_storage_bytes().await.unwrap(), 135);
        repos
            .clips
            .release_failed_storage_reservation(&clips[0].id)
            .await
            .unwrap();
        assert_eq!(repos.clips.total_storage_bytes().await.unwrap(), 35);
        assert_eq!(
            repos
                .clips
                .active_storage_bytes_for_owner(&user.id)
                .await
                .unwrap(),
            35
        );
        assert_eq!(
            repos
                .clips
                .get(&clips[0].id)
                .await
                .unwrap()
                .unwrap()
                .file_size_bytes,
            Some(100)
        );
        repos.clips.delete(&clips[1].id).await.unwrap();
        assert_eq!(repos.clips.total_storage_bytes().await.unwrap(), 10);
        assert_eq!(
            repos.clips.active_storage_bytes_by_owner().await.unwrap(),
            vec![(user.id, 10)]
        );
    }
}

#[tokio::test]
async fn identities_and_search_share_unicode_case_folding() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let mut owner = NewUser::new("Álice", "hash", "admin");
        owner.email = Some("Example@Clipline.test".into());
        let owner = repos.users.create(&owner).await.unwrap();
        assert_eq!(
            repos
                .users
                .get_by_username("áLICE")
                .await
                .unwrap()
                .unwrap()
                .id,
            owner.id
        );
        assert!(repos
            .users
            .create(&NewUser::new("áLICE", "hash", "user"))
            .await
            .unwrap_err()
            .is_unique_violation());
        let mut duplicate_email = NewUser::new("bob", "hash", "user");
        duplicate_email.email = Some("example@clipline.TEST".into());
        assert!(repos
            .users
            .create(&duplicate_email)
            .await
            .unwrap_err()
            .is_unique_violation());
        repos.ensure_game_category("Über").await.unwrap();
        repos.ensure_game_category("über").await.unwrap();
        assert_eq!(repos.game_categories.list().await.unwrap().len(), 1);
        let mut clip = NewClip::new(&owner.id, "École highlight", "local");
        clip.game_name = Some("Über".into());
        clip.status = "ready".into();
        clip.visibility = "public".into();
        clip.public_share_id = Some("c_unicode_regression".into());
        repos.clips.create(&clip).await.unwrap();
        for query in ["ÉCOLE", "Über", "über"] {
            let found = repos
                .clips
                .list_public(&PublicClipListParams {
                    owner_user_id: None,
                    game: None,
                    game_category_id: None,
                    query: Some(query.into()),
                    sort: ClipSort::TitleAsc,
                    limit: 10,
                    offset: 0,
                })
                .await
                .unwrap();
            assert_eq!(
                found.len(),
                1,
                "{} search on {:?}",
                query,
                repos.users.get(&owner.id).await.unwrap()
            );
        }
    }
}

#[tokio::test]
async fn resets_invites_and_stale_edits_cannot_restore_old_authority() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let mut owner = NewUser::new("owner", "hash", "admin");
        owner.password_change_required = true;
        let owner = repos.users.create(&owner).await.unwrap();
        let expires = now_utc() + Duration::hours(2);
        let first = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "first", expires))
            .await
            .unwrap();
        let second = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "second", expires))
            .await
            .unwrap();
        assert!(repos
            .reset_password_tokens
            .get(&first.id)
            .await
            .unwrap()
            .unwrap()
            .used_at
            .is_some());
        repos
            .update_password_and_revoke_credentials(&owner.id, "new-hash")
            .await
            .unwrap();
        assert!(repos
            .reset_password_tokens
            .get(&second.id)
            .await
            .unwrap()
            .unwrap()
            .used_at
            .is_some());
        let owner = repos.users.get(&owner.id).await.unwrap().unwrap();
        assert!(!owner.password_change_required);
        let mut invitation = NewInvitationToken::new("invite", "user", expires);
        invitation.created_by_user_id = Some(owner.id.clone());
        let invitation = repos.invitation_tokens.create(&invitation).await.unwrap();
        let reset = repos
            .reset_password_tokens
            .create(&NewResetPasswordToken::new(&owner.id, "third", expires))
            .await
            .unwrap();
        assert!(repos
            .update_user_if_current(&owner, None, "admin", true, None)
            .await
            .unwrap());
        assert!(!repos
            .update_user_if_current(&owner, Some("stale name"), "admin", false, None)
            .await
            .unwrap());
        let disabled = repos.users.get(&owner.id).await.unwrap().unwrap();
        assert!(disabled.is_disabled);
        assert!(repos
            .update_user_if_current(&disabled, None, "admin", false, None)
            .await
            .unwrap());
        assert!(!repos
            .redeem_reset_password_token(&reset.id, &owner.id, "stolen", now_utc())
            .await
            .unwrap());
        assert!(!repos
            .invitation_tokens
            .claim_if_valid(&invitation.id, "claim", now_utc())
            .await
            .unwrap());
        assert!(!repos
            .redeem_invitation_token(
                &invitation.id,
                "invite",
                &NewUser::new("invited", "hash", "user"),
                now_utc()
            )
            .await
            .unwrap());
    }
}

#[tokio::test]
async fn part_writes_and_terminal_upload_states_are_consistent() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let user = repos
            .users
            .create(&NewUser::new("uploader", "hash", "user"))
            .await
            .unwrap();
        let mut clip = NewClip::new(&user.id, "upload", "local");
        clip.client_clip_id = Some("desktop-id".into());
        let clip = repos.clips.create(&clip).await.unwrap();
        let session = repos
            .upload_sessions
            .create(&NewUploadSession::new(
                &clip.id,
                &user.id,
                10,
                "objects/media/example/source.mp4",
                now_utc() + Duration::hours(1),
            ))
            .await
            .unwrap();
        let (left, right) = tokio::join!(
            repos.upload_parts.claim_write(&session.id, 1, "left"),
            repos.upload_parts.claim_write(&session.id, 1, "right")
        );
        assert_ne!(left.unwrap(), right.unwrap());
        repos
            .upload_parts
            .release_write(&session.id, 1, "unknown")
            .await
            .unwrap();
        assert!(!repos
            .upload_parts
            .claim_write(&session.id, 1, "third")
            .await
            .unwrap());
        repos
            .upload_parts
            .release_write(&session.id, 1, "left")
            .await
            .unwrap();
        repos
            .upload_parts
            .release_write(&session.id, 1, "right")
            .await
            .unwrap();
        assert!(repos
            .upload_parts
            .claim_write(&session.id, 1, "third")
            .await
            .unwrap());
        let mut job = NewJob::new("validate_object", now_utc());
        job.target_type = Some("clip".into());
        job.target_id = Some(clip.id.clone());
        let job = repos.jobs.create(&job).await.unwrap();
        repos
            .jobs
            .claim_next("runner", now_utc(), now_utc() - Duration::minutes(5))
            .await
            .unwrap()
            .unwrap();
        assert!(repos
            .jobs
            .mark_dead_if_locked(&job.id, "runner", 1, "invalid object")
            .await
            .unwrap());
        assert_eq!(
            repos.clips.get(&clip.id).await.unwrap().unwrap().status,
            "failed"
        );
        assert_eq!(
            repos
                .upload_sessions
                .get(&session.id)
                .await
                .unwrap()
                .unwrap()
                .status,
            "failed"
        );
        assert_eq!(
            repos.abort_upload(&session.id, &clip.id).await.unwrap(),
            AbortUploadOutcome::Aborted
        );
        assert!(repos
            .clips
            .get_by_owner_client_clip_id(&user.id, "desktop-id")
            .await
            .unwrap()
            .is_none());
    }
}

#[tokio::test]
async fn jobs_allow_other_owners_to_progress_and_replies_keep_their_parent() {
    let (_directory, databases) = backends().await;
    for database in databases {
        let repos = Repositories::new(database);
        let first = repos
            .users
            .create(&NewUser::new("first", "hash", "user"))
            .await
            .unwrap();
        let second = repos
            .users
            .create(&NewUser::new("second", "hash", "user"))
            .await
            .unwrap();
        let clip = repos
            .clips
            .create(&NewClip::new(&first.id, "clip", "local"))
            .await
            .unwrap();
        for user in [&first, &first, &second] {
            let target = repos
                .clips
                .create(&NewClip::new(&user.id, "job", "local"))
                .await
                .unwrap();
            let mut job = NewJob::new("probe_metadata", now_utc());
            job.target_id = Some(target.id);
            job.target_type = Some("clip".into());
            repos.jobs.create(&job).await.unwrap();
        }
        let now = now_utc() + Duration::seconds(1);
        let stale = now - Duration::minutes(5);
        let first_job = repos
            .jobs
            .claim_next("a", now, stale)
            .await
            .unwrap()
            .unwrap();
        let second_job = repos
            .jobs
            .claim_next("b", now, stale)
            .await
            .unwrap()
            .unwrap();
        let first_owner = repos
            .clips
            .get(first_job.target_id.as_deref().unwrap())
            .await
            .unwrap()
            .unwrap()
            .owner_user_id;
        let second_owner = repos
            .clips
            .get(second_job.target_id.as_deref().unwrap())
            .await
            .unwrap()
            .unwrap()
            .owner_user_id;
        assert_ne!(first_owner, second_owner);
        assert!(repos
            .jobs
            .claim_next("c", now, stale)
            .await
            .unwrap()
            .is_none());
        let parent = repos
            .clip_comments
            .create(&NewClipComment::new(&clip.id, &first.id, "old parent"))
            .await
            .unwrap();
        for index in 0..101 {
            repos
                .clip_comments
                .create(&NewClipComment::new(
                    &clip.id,
                    &first.id,
                    format!("root {index}"),
                ))
                .await
                .unwrap();
        }
        let mut reply = NewClipComment::new(&clip.id, &first.id, "new reply");
        reply.parent_comment_id = Some(parent.id.clone());
        let reply = repos.clip_comments.create(&reply).await.unwrap();
        let comments = repos
            .clip_comments
            .list_for_clip(&clip.id, 100)
            .await
            .unwrap();
        assert!(comments.iter().any(|comment| comment.id == reply.id));
        assert!(comments.iter().any(|comment| comment.id == parent.id));
        assert!(comments.len() <= 200);
    }
}
