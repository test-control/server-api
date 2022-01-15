const helpers = require('../migration-helpers')
const schemaName = helpers.getSchemaName('test_control')

exports.up = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_suites', tbl => {
      tbl.integer('elements_amount').unsigned().defaultTo(0)
    })
}

exports.down = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_suites', tbl => {
      tbl.dropColumn('elements_amount')
    })
}
