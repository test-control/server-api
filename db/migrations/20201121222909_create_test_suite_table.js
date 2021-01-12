
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('test_suite', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('project_id').references('id').inTable('test_control.projects').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('test_suite')
}
