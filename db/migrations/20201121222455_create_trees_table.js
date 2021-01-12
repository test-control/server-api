
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('trees', tbl => {
    tbl.uuid('id').primary()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('root_id').references('id').inTable('test_control.trees').nullable()
    tbl.uuid('parent_id').references('id').inTable('test_control.trees').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('trees')
}
