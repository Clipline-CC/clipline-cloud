-- Fail explicitly on existing ambiguous identities instead of silently changing
-- an account's identity. Resolve case-only duplicates before upgrading.
CREATE UNIQUE INDEX users_username_casefold ON users (LOWER(username));
CREATE UNIQUE INDEX users_email_casefold ON users (LOWER(email)) WHERE email IS NOT NULL;
REINDEX;
