\echo "Delete and recreate db?"
-- \prompt 'Are you sure? [y/N] ' sure
-- \if :sure != 'y' \quit

DROP DATABASE IF EXISTS streaming_service;
CREATE DATABASE streaming_service;
\connect streaming_service

\i schema.sql
\i seed.sql

-- \echo 'Delete and recreate test db?'
-- \prompt 'Are you sure? [y/N] ' sure
-- \if :sure != 'y' \quit

DROP DATABASE IF EXISTS streaming_service_test;
CREATE DATABASE streaming_service_test;
\connect streaming_service_test

\i schema.sql