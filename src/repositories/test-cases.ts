import Knex from 'knex'
import { Schemas } from '../auto-types'
import { getFullTableName, TableNames } from '../database'
import { SimpleCrudRepository } from './common'

export type CreateUpdatePayload = Pick<Schemas.Entities.TestCaseEntity, 'title' | 'description'>;

export class TestCasesRepository extends SimpleCrudRepository<Schemas.Entities.TestCaseEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.TestCases)
  }

  async paginateFromTree (treeId: string, currentPage: number, perPage: number) {
    return this.store()
      .where('test_suite_id', treeId)
      .orderBy('display_order', 'asc')
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }

  async changeDisplayOrder (fromId: string, toId: string) {
    const funcName = getFullTableName('test_cases_change_display_order')

    return this.knex().raw(`call ${funcName}(?, ?)`, [
      fromId,
      toId
    ])
  }
}
