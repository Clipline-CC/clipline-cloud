CREATE TABLE clip_video_optimizations (
  clip_id      TEXT PRIMARY KEY REFERENCES clips(id) ON DELETE CASCADE,
  outcome      TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL
);
