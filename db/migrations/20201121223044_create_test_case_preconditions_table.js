
exports.up = function (knex) {
  return knex.schema.createTable('test_cases_preconditions', tbl => {
    tbl.uuid('id').primary()
    tbl.uuid('test_case_id').references('id').inTable('test_cases').notNullable()
    tbl.text('title').notNullable()
    tbl.text('description').nullable()
    tbl.uuid('display_after').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('test_cases_preconditions')
}
