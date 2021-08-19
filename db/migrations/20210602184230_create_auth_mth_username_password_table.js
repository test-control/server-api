const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .createTable('auth_mth_username_password', tbl => {
      tbl.uuid('id').primary()
      tbl.uuid('accounts_id').references('id').inTable(helpers.getFullTableName('accounts')).notNullable()
      tbl.text('username').notNullable()
      tbl.text('password').notNullable()
      tbl.text('password_type').notNullable()
      tbl.timestamp('created_at').notNullable()
      tbl.unique(['username'])
    })
}

exports.down = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .dropTableIfExists('auth_mth_username_password')
}
