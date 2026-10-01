-- Existing installations indexed with SQLite's ASCII-only LOWER. Rebuild
-- candidates with the Unicode LOWER registered by the server before migration.
INSERT INTO clip_search(clip_search) VALUES ('delete-all');
INSERT INTO clip_search(rowid, title, game_name, game_id)
  SELECT document.id, LOWER(clip.title), LOWER(COALESCE(clip.game_name, '')), LOWER(COALESCE(clip.game_id, ''))
  FROM clips clip JOIN clip_search_documents document ON document.clip_id = clip.id;
