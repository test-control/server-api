
exports.up = function (knex) {
  return knex.schema.createTable('test_cases', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_cases')
}
