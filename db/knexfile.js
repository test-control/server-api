module.exports = {
  env: {
    client: 'pg',
    connection: process.env.POSTGRESQL_CONNECTION_STRING,
    searchPath: ['public']
  }
}
