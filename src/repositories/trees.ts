import { SimpleCrudRepository } from './common'
import { Schemas } from '../auto-types'
import Knex from 'knex'
import { TableNames } from '../database'
import { v4 as uuid } from 'uuid'

type CreateUpdatePayload = Omit<Schemas.Entities.TreeEntity, 'id' | 'tree_path'>;

export class TreesRepository extends SimpleCrudRepository<Schemas.Entities.TreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Trees)
  }

  async createParent (data: CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    const treesId = uuid()

    const sql = `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, trees_generate_root_new_path(),?)`

    await this.knex().raw(sql, [
      treesId,
      data.title,
      data.created_at
    ])

    return this.store().where('id', treesId).first()
  }

  async createLeaf (parentPath: string, data:CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    const sql = `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, trees_generate_new_path('${parentPath}'),?)`

    const treesId = uuid()

    await this.knex().raw(sql, [
      treesId,
      data.title,
      data.created_at || new Date()
    ])

    return this.store().where('id', treesId).first()
  }

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    return this.store()
      .where('parent_id', parentId)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }
}
