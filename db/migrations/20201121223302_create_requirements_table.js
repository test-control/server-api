const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).createTable('requirements', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('project_id').references('id').inTable(helpers.getFullTableName('projects')).notNullable()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).dropTableIfExists('requirements')
}
