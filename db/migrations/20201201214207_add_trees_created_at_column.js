
exports.up = function (knex) {
  return knex.schema.table('trees', tbl => {
    tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.table('trees', tbl => {
    tbl.dropColumn('created_at')
  })
}
