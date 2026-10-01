CREATE TABLE maintenance_cursors (
  name TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX jobs_succeeded_retention_idx ON jobs(updated_at, id) WHERE status = 'succeeded';
CREATE INDEX clips_storage_key_idx ON clips(storage_key) WHERE deleted_at IS NULL AND status <> 'deleted';
CREATE INDEX clips_poster_key_idx ON clips(poster_key) WHERE deleted_at IS NULL AND status <> 'deleted';
CREATE INDEX clips_thumbnail_key_idx ON clips(thumbnail_key) WHERE deleted_at IS NULL AND status <> 'deleted';
CREATE INDEX upload_sessions_storage_upload_id_idx ON upload_sessions(storage_upload_id)
  WHERE status IN ('created','uploading');
