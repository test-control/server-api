-- +migrate Up
-- +migrate StatementBegin
CREATE TABLE test_cases_preconditions(
   id            uuid     PRIMARY KEY,
   test_case_id  uuid     NOT NULL,
   title         text     NOT NULL,
   description   text     NOT NULL,
   display_after uuid     NULL,

   FOREIGN KEY (test_case_id) REFERENCES test_cases(id)
);

-- +migrate StatementEnd
-- +migrate Down
DELETE TABLE test_cases_preconditions;
