
exports.up = function (knex) {
  return knex.schema.withSchema('test_control').table('trees', tbl => {
    tbl.dropForeign([
      'root_id'
    ])
    tbl.dropColumn('root_id')

    tbl.dropForeign([
      'parent_id'
    ])
    tbl.dropColumn('parent_id')

    tbl.string('tree_path', 256).notNullable().unique()
  })
}

exports.down = function (knex) {
  return knex.schema.withSchema('test_control').table('trees', tbl => {
    tbl.dropColumn('tree_path')
    tbl.uuid('root_id').references('id').inTable('test_control.trees').nullable()
    tbl.uuid('parent_id').references('id').inTable('test_control.trees').nullable()
  })
}
