-- +migrate Up
-- +migrate StatementBegin
CREATE TABLE test_cases(
   id            uuid  PRIMARY KEY,
   title         text  NOT NULL,
   description   text
);

-- +migrate StatementEnd
-- +migrate Down
DELETE TABLE test_cases;