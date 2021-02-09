const helpers = require('../migration-helpers')
const schemaName = helpers.getSchemaName('test_control')

exports.up = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.integer('display_order')
      tbl.index('display_order')
    })
}

exports.down = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.dropColumn('display_order')
    })
}
