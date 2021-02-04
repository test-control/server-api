import { SimpleCrudRepository } from './common'
import { Schemas } from '../auto-types'
import Knex, { Transaction } from 'knex'
import { getFullTableName, TableNames } from '../database'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { ResourcesNotFound } from '../common'
import { getAllLeavesFromRoot } from '../common/trees'

export type CreateUpdatePayload = Omit<Schemas.Entities.TreeEntity, 'id' | 'tree_path'>;

export class TreesRepository extends SimpleCrudRepository<Schemas.Entities.TreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Trees)
  }

  async runInLockedTable (callback : (trx:Transaction) => Promise<any>) {
    return this.knex().transaction(async (trx) => {
      return trx
        .raw(`lock ${this.tableName} in exclusive mode;`)
        .then(() => {
          return callback(trx)
        })
    })
  }

  async createParent (data: CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    const treesId = uuid()
    const funcName = getFullTableName('trees_generate_root_new_path')

    const sql = `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, ${funcName}(), ?)`

    await this.runInLockedTable((trx:Transaction) => {
      return trx.raw(sql, [
        treesId,
        data.title,
        moment(data.created_at).format('YYYY-MM-DD hh:mm:ss')
      ]).transacting(trx)
    })

    return this.store()
      .where('id', treesId)
      .first()
  }

  async createLeaf (parentPath: string, data:CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    const funcName = getFullTableName('trees_generate_new_path')
    const sql = `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, ${funcName}('${parentPath}'),?)`
    const treesId = uuid()

    await this.runInLockedTable((trx:Transaction) => {
      return trx.raw(sql, [
        treesId,
        data.title,
        data.created_at || new Date()
      ]).transacting(trx)
    })

    return this.store()
      .where('id', treesId)
      .first()
  }

  async findById (id: string) : Promise<Schemas.Entities.TreeEntity> {
    return this.store()
      .where('id', id)
      .first()
  }

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    const parent = await this.findById(parentId)

    return this.store()
      .whereRaw(`tree_path ~ '^${parent.tree_path}\\.[0-9]{1,}$'`)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }

  async getAllLeavesFromRoot (leafId: string) : Promise<Schemas.Entities.TreeEntity[]> {
    const leaf = await this.findById(leafId)

    if (!leaf) {
      throw new ResourcesNotFound({
        leafId: leafId
      })
    }

    const allLeaves = getAllLeavesFromRoot(leaf.tree_path)

    return this.store()
      .whereIn('tree_path', allLeaves)
  }
}
