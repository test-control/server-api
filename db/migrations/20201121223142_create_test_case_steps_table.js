
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').createTable('test_cases_steps', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('test_case_id').references('id').inTable('test_control.test_cases').notNullable()
    tbl.integer('order_id').nullable()
    tbl.text('title').notNullable()
    tbl.uuid('display_after').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').dropTableIfExists('test_cases_steps')
}
