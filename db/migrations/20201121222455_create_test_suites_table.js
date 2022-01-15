const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).createTable('test_suites', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('root_id').references('id').inTable(helpers.getFullTableName('test_suites')).nullable()
    tbl.uuid('parent_id').references('id').inTable(helpers.getFullTableName('test_suites')).nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).dropTableIfExists('test_suites')
}
