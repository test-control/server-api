import { SimpleCrudRepository } from './common'
import { Schemas } from '../auto-types'
import Knex, { Transaction } from 'knex'
import { getFullTableName, TableNames } from '../database'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { ResourcesNotFound } from '../common'
import { extractRootFromPath, getAllLeavesFromRoot } from '../common/trees'

export type CreateUpdatePayload = Omit<Schemas.Entities.TreeEntity, 'id' | 'tree_path' | 'elements_amount'>;

export class TreesRepository extends SimpleCrudRepository<Schemas.Entities.TreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Trees)
  }

  useCreationDate (): { columnName: string } | null {
    return {
      columnName: 'created_at'
    }
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
        data.created_at || this.getCurrentDate()
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

  async findByTreePath (treePath: string) : Promise<Schemas.Entities.TreeEntity> {
    return this.store()
      .where('tree_path', treePath)
      .first()
  }

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    const parent = await this.findById(parentId)

    return this.store()
      .whereRaw(`tree_path ~ '^${parent.tree_path}\\.[0-9]{1,}$'`)
      .orderBy('tree_path', 'desc')
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

  async getRoot (treeId: string) : Promise<Schemas.Entities.TreeEntity> {
    const leaf = await this.findById(treeId)

    if (!leaf) {
      throw new ResourcesNotFound({
        leafId: treeId
      })
    }

    const rootPath = extractRootFromPath(leaf.tree_path)

    if (rootPath === leaf.tree_path) {
      return leaf
    }

    return this.findByTreePath(rootPath)
  }

  async incrementElementsAmountByTreePath (treePath: string) {
    return this.store()
      .where('tree_path', treePath)
      .update({
        elements_amount: this.knex().raw('elements_amount + 1')
      })
  }

  async incrementElementsAmountById (treeId: string) {
    return this.store()
      .where('id', treeId)
      .update({
        elements_amount: this.knex().raw('elements_amount + 1')
      })
  }

  async decrementElementsAmountByTreePath (treePath: string) {
    return this.store()
      .where('tree_path', treePath)
      .update({
        elements_amount: this.knex().raw('elements_amount - 1')
      })
  }

  async decrementElementsAmountById (treeId: string) {
    return this.store()
      .where('id', treeId)
      .update({
        elements_amount: this.knex().raw('elements_amount - 1')
      })
  }
}
