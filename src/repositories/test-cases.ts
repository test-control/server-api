import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<Schemas.Entities.TestCaseEntity, 'title' | 'description'>;

export class TestCasesRepository extends SimpleCrudRepository<Schemas.Entities.TestCaseEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.TestCases)
  }

  async paginateFromTree (treeId: string, currentPage: number, perPage: number) {
    return this.store()
      .where('tree_id', treeId)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }
}
