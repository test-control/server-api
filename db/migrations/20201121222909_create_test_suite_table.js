
exports.up = function (knex) {
  return knex.schema.createTable('test_suite', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('project_id').references('id').inTable('projects').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_suite')
}
