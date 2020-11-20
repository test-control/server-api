import { SimpleCrudRepository } from './common'
import { Schemas } from '../auto-types'
import Knex from 'knex'
import { TableNames } from '../database'

type CreateUpdatePayload = Omit<Schemas.Entities.TreeEntity, 'id'>;

export class TreesRepository extends SimpleCrudRepository<Schemas.Entities.TreeEntity, CreateUpdatePayload> {
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
