const helpers = require('../migration-helpers')
const schemaName = helpers.getSchemaName('test_control')

exports.up = function (knex) {
  return knex.schema
    .withSchema(schemaName)
    .table('entities_history', tbl => {
      tbl.uuid('account_id')
        .references('id')
        .inTable(helpers.getFullTableName('accounts'))
        .nullable()
    })
}

exports.down = function (knex) {
  return knex.schema.withSchema(schemaName)
    .table('entities_history', tbl => {
      tbl.dropColumn('account_id')
    })
}
