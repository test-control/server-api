import { TestSuitesRepository } from '../test-suites'
import { Transaction } from 'knex'
import { TableNames } from '../../database'

export class MssqlTestSuitesRepository extends TestSuitesRepository {
  async runInLockedTable (callback : (trx:Transaction) => Promise<any>) {
    return this.knex().transaction(async (trx) => {
      return trx
        .raw(`SELECT TOP (1) 1 FROM ${TableNames.TestSuites} WITH (TABLOCKX)`)
        .then(() => {
          return callback(trx)
        })
    })
  }

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    const parent = await this.findById(parentId)

    return this.store()
      .whereRaw(`charindex('${parent.tree_path}.', tree_path) >= 1`)
      .andWhereRaw(`charindex('.', STUFF(tree_path, charindex('${parent.tree_path}.', tree_path), LEN('${parent.tree_path}.'), '')) <1`)
      .orderBy('tree_path', 'desc')
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }
}
