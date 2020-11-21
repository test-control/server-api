
exports.up = function (knex) {
  return knex.schema.createTable('test_cases_steps', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('test_case_id').references('id').inTable('test_cases').notNullable()
    tbl.integer('order_id').nullable()
    tbl.text('title').notNullable()
    tbl.uuid('display_after').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_cases_steps')
}
