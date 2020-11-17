import { SimpleCrudRepository } from './common'
import { TreeEntity } from '../auto-types'
import Knex from 'knex'
import { TableNames } from '../database'

type CreateUpdatePayload = Omit<TreeEntity, 'id'>;

export class TreesRepository extends SimpleCrudRepository<TreeEntity, CreateUpdatePayload> {
  constructor (knex: Knex) {
    super(knex, TableNames.Trees)
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
