
exports.up = function (knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects')
}
