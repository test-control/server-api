
exports.up = function (knex) {
  return knex.schema.createTable('project_trees', tbl => {
    tbl.uuid('project_id').references('id').inTable('projects').notNullable()
    tbl.uuid('tree_id').references('id').inTable('trees').notNullable()
    tbl.unique(['project_id', 'tree_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('project_trees')
}
