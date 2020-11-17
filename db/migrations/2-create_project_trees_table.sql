-- +migrate Up
-- +migrate StatementBegin

CREATE TABLE trees
(
   id           uuid      PRIMARY KEY,
   title        text      NOT NULL,
   root_id      uuid,
   parent_id    uuid,

   FOREIGN  KEY(root_id) REFERENCES trees(id),
   FOREIGN  KEY(parent_id) REFERENCES trees(id)
);

CREATE TABLE project_trees(
   project_id  uuid,
   tree_id     uuid,

   FOREIGN KEY(project_id) REFERENCES projects(id),
   FOREIGN KEY(tree_id) REFERENCES trees(id),

   UNIQUE(project_id, tree_id)
);

-- +migrate StatementEnd
-- +migrate Down
-- +migrate StatementBegin
DROP TABLE project_trees;
DROP TABLE trees;
-- +migrate StatementEnd