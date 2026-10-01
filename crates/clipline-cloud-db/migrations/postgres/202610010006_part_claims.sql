CREATE TABLE upload_part_claims (
  upload_session_id TEXT NOT NULL REFERENCES upload_sessions(id) ON DELETE CASCADE,
  part_number BIGINT NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (upload_session_id, part_number)
);
CREATE INDEX jobs_target_progress ON jobs (target_id, attempts, updated_at);
