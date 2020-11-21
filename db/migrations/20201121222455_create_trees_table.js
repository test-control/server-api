
exports.up = function (knex) {
  return knex.schema.createTable('trees', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('root_id').references('id').inTable('trees').nullable()
    tbl.uuid('parent_id').references('id').inTable('trees').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('trees')
}
