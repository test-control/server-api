const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .createTable('accounts', tbl => {
      tbl.uuid('id').primary()
      tbl.timestamp('created_at')
    })
}

exports.down = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .dropTableIfExists('accounts')
}
