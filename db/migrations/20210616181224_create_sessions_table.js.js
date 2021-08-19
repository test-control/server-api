const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .createTable('sessions', tbl => {
      tbl.uuid('id').primary()
      tbl.uuid('accounts_id').references('id').inTable(helpers.getFullTableName('accounts')).notNullable()
      tbl.timestamp('created_at').notNullable()
    })
}

exports.down = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .dropTableIfExists('sessions')
}
