const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).createTable('projects', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .dropTableIfExists('projects')
}
