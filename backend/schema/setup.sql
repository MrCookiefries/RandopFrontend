-- warn before deleting databases
\echo 'The Database named randop will be created, deleting any other one with that name.'
\prompt 'Return to confirm, or CTRL + C to back out.' foo

-- delete, create & connect for a clean working slate
DROP DATABASE IF EXISTS randop;
CREATE DATABASE randop;
\c randop

-- add tables & starter data into them
\i schema.sql
\i seed.sql

-- warn before deleting databases
\echo 'The Database named randop_test will be created, deleting any other one with that name.'
\prompt 'Return to confirm, or CTRL + C to back out.' foo

-- delete, create & connect for a clean working slate
DROP DATABASE IF EXISTS randop_test;
CREATE DATABASE randop_test;
\c randop_test

-- add tables & leave them empty
\i schema.sql
