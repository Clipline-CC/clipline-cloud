-- Only existing accounts create rows; arbitrary anonymous usernames cannot grow this table.
CREATE TABLE auth_password_attempts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL CHECK (scope IN ('login', 'reauth')),
  attempts BIGINT NOT NULL DEFAULT 0,
  reset_at TIMESTAMPTZ NOT NULL,
  blocked_until TIMESTAMPTZ,
  PRIMARY KEY (user_id, scope)
);
