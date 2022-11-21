 -- Database: blue_ocean

-- DROP DATABASE IF EXISTS blue_ocean;

-- CREATE DATABASE blue_ocean
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

\c chat;
