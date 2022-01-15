const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).table('test_suites', tbl => {
    tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).table('test_suites', tbl => {
    tbl.dropColumn('created_at')
  })
}
