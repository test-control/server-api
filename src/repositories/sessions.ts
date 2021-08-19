import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Omit<Schemas.Entities.SessionEntity, 'id' | 'created_at'>

export class SessionsRepository extends SimpleCrudRepository<Schemas.Entities.SessionEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Sessions)
  }

  useCreationDate (): { columnName: string } | null {
    return {
      columnName: 'created_at'
    }
  }
}
