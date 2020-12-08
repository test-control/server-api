import Knex from 'knex'
import { getEnvs } from '../common/envs'
const { attachPaginate } = require('knex-paginate')

let appConnection : Knex

const dbSettingsMap = {
  postgresql: {
    driver: 'pg',
    env: 'POSTGRESQL_CONNECTION_STRING',
    extraParams: {
      searchPath: ['public']
    }
  },
  mysql: {
    driver: 'mysql',
    env: 'MYSQL_CONNECTION_STRING',
    extraParams: {}
  },
  mssql: {
    driver: 'mssql',
    env: 'MSSQL_CONNECTION_STRING',
    extraParams: {}
  }
}

export const getAppConnection = () : Knex => {
  if (appConnection) {
    return appConnection
  }

  const settings = dbSettingsMap[getEnvs().DATABASE_ENGINE]

  appConnection = Knex({
    client: settings.driver,
    connection: getEnvs()[settings.env],
    ...settings.extraParams
  })

  return appConnection
}

attachPaginate()
