import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<Schemas.Entities.TestCaseEntity, 'title' | 'description'>;

export class TestCasesRepository extends SimpleCrudRepository<Schemas.Entities.TestCaseEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.TestCases)
  }
}
