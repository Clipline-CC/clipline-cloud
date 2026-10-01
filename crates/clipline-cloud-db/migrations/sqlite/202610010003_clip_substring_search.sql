-- Case-sensitive tokens over SQLite LOWER preserve the existing ASCII case rules.
-- MATCH supplies candidates only; repository LIKE predicates verify exact results.
-- Explicit integer document IDs keep the index independent of clips' hidden rowid.
CREATE TABLE clip_search_documents (
  id INTEGER PRIMARY KEY,
  clip_id TEXT NOT NULL UNIQUE REFERENCES clips(id) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO clip_search_documents(clip_id) SELECT id FROM clips;
CREATE VIRTUAL TABLE clip_search USING fts5(title, game_name, game_id,
  content='', tokenize='trigram case_sensitive 1');
INSERT INTO clip_search(rowid, title, game_name, game_id)
  SELECT document.id, LOWER(clip.title), LOWER(COALESCE(clip.game_name, '')), LOWER(COALESCE(clip.game_id, ''))
  FROM clips clip JOIN clip_search_documents document ON document.clip_id = clip.id;
CREATE TRIGGER clip_search_insert AFTER INSERT ON clips BEGIN
  INSERT INTO clip_search_documents(clip_id) VALUES (new.id);
  INSERT INTO clip_search(rowid, title, game_name, game_id)
    VALUES ((SELECT id FROM clip_search_documents WHERE clip_id = new.id), LOWER(new.title), LOWER(COALESCE(new.game_name, '')), LOWER(COALESCE(new.game_id, '')));
END;
CREATE TRIGGER clip_search_delete BEFORE DELETE ON clips BEGIN
  INSERT INTO clip_search(clip_search, rowid, title, game_name, game_id)
    VALUES ('delete', (SELECT id FROM clip_search_documents WHERE clip_id = old.id), LOWER(old.title), LOWER(COALESCE(old.game_name, '')), LOWER(COALESCE(old.game_id, '')));
  DELETE FROM clip_search_documents WHERE clip_id = old.id;
END;
CREATE TRIGGER clip_search_update AFTER UPDATE OF title, game_name, game_id ON clips
WHEN LOWER(old.title) IS NOT LOWER(new.title)
  OR LOWER(COALESCE(old.game_name, '')) IS NOT LOWER(COALESCE(new.game_name, ''))
  OR LOWER(COALESCE(old.game_id, '')) IS NOT LOWER(COALESCE(new.game_id, ''))
BEGIN
  INSERT INTO clip_search(clip_search, rowid, title, game_name, game_id)
    VALUES ('delete', (SELECT id FROM clip_search_documents WHERE clip_id = new.id), LOWER(old.title), LOWER(COALESCE(old.game_name, '')), LOWER(COALESCE(old.game_id, '')));
  INSERT INTO clip_search(rowid, title, game_name, game_id)
    VALUES ((SELECT id FROM clip_search_documents WHERE clip_id = new.id), LOWER(new.title), LOWER(COALESCE(new.game_name, '')), LOWER(COALESCE(new.game_id, '')));
END;
CREATE INDEX clips_game_name_lower_idx ON clips(LOWER(game_name));
