const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).createTable('project_trees', tbl => {
    tbl.uuid('project_id').references('id').inTable(helpers.getFullTableName('projects')).notNullable()
    tbl.uuid('tree_id').references('id').inTable(helpers.getFullTableName('trees')).notNullable()
    tbl.unique(['project_id', 'tree_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema(helpers.getSchemaName('test_control')).dropTableIfExists('project_trees')
}
