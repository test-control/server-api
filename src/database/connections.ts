import Knex from 'knex'
const { attachPaginate } = require('knex-paginate')

export const appConnection = Knex({
  client: 'pg',
  connection: 'postgres://user:pass@172.19.0.2:5432/db?sslmode=disable',
  searchPath: ['public']
})

attachPaginate()
