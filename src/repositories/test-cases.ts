import Knex from 'knex'
import { TestCaseEntity } from '../auto-types'
import { TableNames } from '../database'
import { v4 as uuid } from 'uuid'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<TestCaseEntity, 'title' | 'description'>;

export class TestCasesRepository extends SimpleCrudRepository<TestCaseEntity, CreateUpdatePayload> {
  constructor (knex: Knex) {
    super(knex, TableNames.TestCases)
  }
}
