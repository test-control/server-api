
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('requirements', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('project_id').references('id').inTable('test_control.projects').notNullable()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('requirements')
}
