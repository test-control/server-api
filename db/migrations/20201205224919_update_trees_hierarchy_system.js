
exports.up = function (knex) {
  return knex.schema.table('trees', tbl => {
    tbl.dropForeign([
      'root_id'
    ])
    tbl.dropColumn('root_id')

    tbl.dropForeign([
      'parent_id'
    ])
    tbl.dropColumn('parent_id')

    tbl.text('tree_path').notNullable().unique()
  })
}

exports.down = function (knex) {
  tbl.dropColumn('tree_path')
  tbl.uuid('root_id').references('id').inTable('trees').nullable()
  tbl.uuid('parent_id').references('id').inTable('trees').nullable()
}
