
exports.up = function (knex) {
  return knex.schema.createTable('requirements', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('project_id').references('id').inTable('projects').notNullable()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requirements')
}
