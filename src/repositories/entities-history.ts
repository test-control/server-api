import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'
import Knex from 'knex'
import { TableNames } from '../database'

type CreateUpdatePayload = Omit<Schemas.Entities.EntitiesHistory, 'id'>

export class EntitiesHistoryRepository extends SimpleCrudRepository<Schemas.Entities.EntitiesHistory, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.EntitiesHistory)
  }
}
