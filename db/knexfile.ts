import { setEnvsSettings } from '../src/settings'

setEnvsSettings()

export default {
  postgresql: {
    client: 'pg',
    connection: process.env.POSTGRESQL_CONNECTION_STRING,
    searchPath: ['public'],
    seeds: {
      directory: './seeds',
      loadExtensions: ['.js', '.ts']
    }
  },
  mysql: {
    client: 'mysql',
    connection: process.env.MYSQL_CONNECTION_STRING,
    seeds: {
      directory: './seeds',
      loadExtensions: ['.js', '.ts']
    }
  },
  mssql: {
    client: 'mssql',
    connection: process.env.MSSQL_CONNECTION_STRING,
    seeds: {
      directory: './seeds',
      loadExtensions: ['.js', '.ts']
    }
  }
}
