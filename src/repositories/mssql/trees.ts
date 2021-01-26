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

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    const parent = await this.findById(parentId)

    return this.store()
      .whereRaw(`charindex('${parent.tree_path}.', tree_path) >= 1`)
      .andWhereRaw(`charindex('.', STUFF(tree_path, charindex('${parent.tree_path}.', tree_path), LEN('${parent.tree_path}.'), '')) <1`)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }
}
