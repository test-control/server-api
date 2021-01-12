
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('projects', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('projects')
}
