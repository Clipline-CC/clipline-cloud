-- Only existing accounts create rows; arbitrary anonymous usernames cannot grow this table.
CREATE TABLE auth_password_attempts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL CHECK (scope IN ('login', 'reauth')),
  attempts INTEGER NOT NULL DEFAULT 0,
  reset_at TEXT NOT NULL,
  blocked_until TEXT,
  PRIMARY KEY (user_id, scope)
);
