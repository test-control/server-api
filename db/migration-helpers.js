const getFullTableName = function (tableName) {
  if (process.env.DATABASE_ENGINE === 'mysql') {
    return tableName
  }

  return 'test_control.' + tableName
}

const getSchemaName = function (schemaName) {
  if (process.env.DATABASE_ENGINE === 'mysql') {
    return null
  }

  return schemaName
}

exports.getFullTableName = getFullTableName
exports.getSchemaName = getSchemaName
