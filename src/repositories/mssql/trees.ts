import { TreesRepository } from '../trees'
import { Transaction } from 'knex'
import { TableNames } from '../../database'

export class MssqlTreesRepository extends TreesRepository {
  async runInLockedTable (callback : (trx:Transaction) => Promise<any>) {
    return this.knex().transaction(async (trx) => {
      return trx
        .raw(`SELECT TOP (1) 1 FROM ${TableNames.Trees} WITH (TABLOCKX)`)
        .then(() => {
          return callback(trx)
        })
    })
  }
}
