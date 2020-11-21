import Knex from 'knex'
import { getEnvs } from '../common/envs'
const { attachPaginate } = require('knex-paginate')

let appConnection : Knex

export const getAppConnection = () : Knex => {
  if (!appConnection) {
    appConnection = Knex({
      client: 'pg',
      connection: getEnvs().POSTGRESQL_CONNECTION_STRING,
      searchPath: ['public']
    })
  }

  return appConnection
}

attachPaginate()
