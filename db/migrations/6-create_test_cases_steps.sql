-- +migrate Up
-- +migrate StatementBegin
CREATE TABLE test_cases_steps(
   id            uuid     PRIMARY KEY,
   test_case_id  uuid     NOT NULL,
   order_id      integer  NULL,
   title         text     NOT NULL,
   display_after uuid     NULL,

   FOREIGN KEY (test_case_id) REFERENCES test_cases(id)
);

-- +migrate StatementEnd
-- +migrate Down
DELETE TABLE test_cases_steps;
