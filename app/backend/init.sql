DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'team_user') THEN
        CREATE USER team_user WITH PASSWORD 'team_pass';
    END IF;
END$$;

GRANT ALL PRIVILEGES ON DATABASE unbookinho TO team_user;
CREATE DATABASE unbookinho_shadow;