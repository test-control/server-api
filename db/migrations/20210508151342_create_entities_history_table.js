const helpers = require('../migration-helpers')

exports.up = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .createTable('entities_history', tbl => {
      tbl.uuid('id').primary()
      tbl.enum('action', [
        'created',
        'updated',
        'deleted'
      ])
      tbl.text('entity_name').notNullable()
      tbl.text('entity_id').notNullable()
      tbl.jsonb('new_values')
      tbl.timestamp('created_at')
    })
}

exports.down = function (knex) {
  return knex.schema
    .withSchema(helpers.getSchemaName('test_control'))
    .dropTableIfExists('entities_history')
}
