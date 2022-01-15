const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).createTable('project_test_suites', tbl => {
    tbl.uuid('project_id').references('id').inTable(helpers.getFullTableName('projects')).notNullable()
    tbl.uuid('test_suite_id').references('id').inTable(helpers.getFullTableName('test_suites')).notNullable()
    tbl.unique(['project_id', 'test_suite_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).dropTableIfExists('project_test_suites')
}
