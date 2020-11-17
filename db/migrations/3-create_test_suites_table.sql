
-- +migrate Up
CREATE TABLE test_suite(
   id     uuid    PRIMARY KEY NOT NULL,
   project_id uuid NOT NULL,
   title  text    NOT NULL,
   description text NOT NULL,

   FOREIGN KEY (project_id) REFERENCES projects(id)
);
-- +migrate Down
DELETE TABLE test_suite;