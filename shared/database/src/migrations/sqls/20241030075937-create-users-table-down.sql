-- down.sql

DROP TRIGGER IF EXISTS set_timestamp ON users;

DROP FUNCTION IF EXISTS update_updated_at_column;

DROP TABLE IF EXISTS users;

DROP EXTENSION IF EXISTS "pgcrypto";
