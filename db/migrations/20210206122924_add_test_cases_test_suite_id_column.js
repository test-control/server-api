const helpers = require('../migration-helpers')
const schemaName = helpers.getSchemaName('test_control')

exports.up = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.uuid('test_suite_id').references('id').inTable(helpers.getFullTableName('test_suites'))
    })
}

exports.down = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.dropColumn('test_suite_id')
    })
}
