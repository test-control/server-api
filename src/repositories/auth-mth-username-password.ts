import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'
import Knex from 'knex'
import { TableNames } from '../database'
import { v4 as uuid } from 'uuid'
import { compareSync, hashSync } from 'bcrypt'

type CreateUpdatePayload = Omit<Schemas.Entities.AuthMthUsernamePasswordEntity, 'id' | 'created_at' | 'accounts_id' | 'password_salt' | 'password_type'>

export class AuthMthUsernamePasswordRepository extends SimpleCrudRepository<Schemas.Entities.AuthMthUsernamePasswordEntity, CreateUpdatePayload> {
  private SALT_ROUNDS = 11;

  constructor (knex: () => Knex) {
    super(knex, TableNames.AuthMthUsernamePassword)
  }

  async findByUsername (username: string): Promise<Schemas.Entities.AuthMthUsernamePasswordEntity> {
    return this.store()
      .where('username', username)
      .first()
  }

  async comparePasswords (password: string, user: Schemas.Entities.AuthMthUsernamePasswordEntity) {
    return compareSync(password, user.password)
  }

  async create (data: CreateUpdatePayload): Promise<Schemas.Entities.AuthMthUsernamePasswordEntity> {
    const currentDate = this.getCurrentDate()
    const accountId = uuid()
    const userId = uuid()

    data.password = hashSync(
      data.password,
      this.SALT_ROUNDS
    )

    return this.knex().transaction(async (trx) => {
      await trx(TableNames.Accounts)
        .insert({
          id: accountId,
          created_at: currentDate
        })

      await trx(TableNames.AuthMthUsernamePassword)
        .insert({
          ...data,
          created_at: currentDate,
          accounts_id: accountId,
          password_type: 'bcrypt',
          id: userId
        })

      return trx(TableNames.AuthMthUsernamePassword)
        .where('id', userId)
        .first()
    })
  }
}
