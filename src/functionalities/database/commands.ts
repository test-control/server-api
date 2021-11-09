import { getAppConnection } from '../../database'
import path from 'path'

export interface IDBSeedExample{}

export const dbSeedExample = async (argv:IDBSeedExample) => {
  const knexInstance = getAppConnection()

  await knexInstance.seed.run({
    directory: path.join(__dirname, '..', '..', '..', 'db', 'seeds')
  })

  console.log('Done.')
  return true
}
