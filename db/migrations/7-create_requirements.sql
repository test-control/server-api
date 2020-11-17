-- +migrate Up
-- +migrate StatementBegin
CREATE TABLE requirements(
   id            uuid     PRIMARY KEY,
   project_id    uuid     NOT NULL,
   title         text     NOT NULL,
   description   text     NOT NULL,

   FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- +migrate StatementEnd
-- +migrate Down
DELETE TABLE requirements;
