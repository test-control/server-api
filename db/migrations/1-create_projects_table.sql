-- +migrate Up
CREATE TABLE projects(
   id          uuid      PRIMARY KEY NOT NULL,
   title       text      NOT NULL,
   description text      NULL
);

-- +migrate Down
DELETE TABLE projects;