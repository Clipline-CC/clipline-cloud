-- Preserve failed-upload diagnostics while releasing confirmed-cleaned bytes.
ALTER TABLE clips ADD COLUMN quota_bytes INTEGER CHECK (quota_bytes >= 0);
