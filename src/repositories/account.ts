import { Schemas } from '../auto-types'
import { AccountEntity } from '../auto-types/schemas/entities'
import Knex from 'knex'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Omit<AccountEntity, 'id'>

export class AccountRepository extends SimpleCrudRepository<AccountEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Accounts)
  }
}
