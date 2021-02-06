const helpers = require('../migration-helpers')
const schemaName = helpers.getSchemaName('test_control')

exports.up = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.uuid('tree_id').references('id').inTable(helpers.getFullTableName('trees'))
    })
}

exports.down = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('test_cases', tbl => {
      tbl.dropColumn('tree_id')
    })
}
