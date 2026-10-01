-- pg_trgm is a trusted extension. The migration role needs CREATE on the database
-- unless an operator has already installed it. Honor an existing extension schema.
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;
DO $$
DECLARE extension_schema TEXT;
BEGIN
  SELECT namespace.nspname INTO extension_schema
    FROM pg_extension extension JOIN pg_namespace namespace ON namespace.oid = extension.extnamespace
    WHERE extension.extname = 'pg_trgm';
  EXECUTE format('CREATE INDEX clips_title_trigram_idx ON clips USING gin (LOWER(title) %I.gin_trgm_ops)', extension_schema);
  EXECUTE format('CREATE INDEX clips_game_name_trigram_idx ON clips USING gin (LOWER(COALESCE(game_name, '''')) %I.gin_trgm_ops)', extension_schema);
  EXECUTE format('CREATE INDEX clips_game_id_trigram_idx ON clips USING gin (LOWER(COALESCE(game_id, '''')) %I.gin_trgm_ops)', extension_schema);
  EXECUTE format('CREATE INDEX game_categories_display_name_trigram_idx ON game_categories USING gin (LOWER(display_name) %I.gin_trgm_ops)', extension_schema);
END $$;
CREATE INDEX clips_game_name_lower_idx ON clips(LOWER(game_name));
