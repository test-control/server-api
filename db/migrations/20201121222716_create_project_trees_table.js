
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('project_trees', tbl => {
    tbl.uuid('project_id').references('id').inTable('test_control.projects').notNullable()
    tbl.uuid('tree_id').references('id').inTable('test_control.trees').notNullable()
    tbl.unique(['project_id', 'tree_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('project_trees')
}
