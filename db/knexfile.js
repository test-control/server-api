module.exports = {
  postgresql: {
    client: 'pg',
    connection: process.env.POSTGRESQL_CONNECTION_STRING,
    searchPath: ['public'],
    seeds: {
      directory: './seeds'
    }
  },
  mysql: {
    client: 'mysql',
    connection: process.env.MYSQL_CONNECTION_STRING,
    seeds: {
      directory: './seeds'
    }
  },
  mssql: {
    client: 'mssql',
    connection: process.env.MSSQL_CONNECTION_STRING,
    seeds: {
      directory: './seeds'
    }
  }
}
