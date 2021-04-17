import Knex from 'knex'
import { v4 as uuid } from 'uuid'
import { ISimpleCrudRepository } from '../common/simple-crud'
import moment from 'moment'

type EntityBody = {
  [key: string]: any;
}

export class SimpleCrudRepository<EntityType extends EntityBody, CreateUpdatePayload extends Partial<EntityBody>> implements ISimpleCrudRepository<EntityType, CreateUpdatePayload> {
  protected readonly store = () => this.knex()(this.tableName);

  constructor (protected knex: () => Knex, protected tableName: string) {}

  bindFindById () {
    return this.findById.bind(this)
  }

  bindDeleteById () {
    return this.deleteById.bind(this)
  }

  bindCreate () {
    return this.create.bind(this)
  }

  bindUpdate () {
    return this.update.bind(this)
  }

  bindPaginate () {
    return this.paginate.bind(this)
  }

  useCreationDate () : null | {
    columnName: string
    } {
    return null
  }

  async changeDisplayAfter (id:string, displayAfterId:string, displayMoveDirection: string) {
    const row = await this.findById(id)

    if (!row) {
      return
    }

    await this.store()
      .where('display_after', row.id)
      .update({
        display_after: row.display_after || this.knex().raw('DEFAULT')
      })

    if (displayMoveDirection === 'up') {
      const displayAfter = await this.findById(displayAfterId)

      await this.store()
        .where('id', row.id)
        .update({
          display_after: displayAfter.display_after || this.knex().raw('DEFAULT')
        })

      await this.store()
        .where('id', displayAfter.id)
        .update({
          display_after: row.id || this.knex().raw('DEFAULT')
        })
    } else {
      await this.store()
        .where('display_after', displayAfterId)
        .update({
          display_after: row.id || this.knex().raw('DEFAULT')
        })
      await this.store()
        .where('id', row.id)
        .update({
          display_after: displayAfterId || this.knex().raw('DEFAULT')
        })
    }
  }

  async findById (id:string) : Promise<EntityType|undefined> {
    return this.store()
      .where('id', id)
      .first()
  }

  async getByIds (ids:string[]) : Promise<EntityType[]|undefined> {
    return this.store()
      .whereIn('id', ids)
  }

  async deleteById (id:string) {
    return this.store()
      .where('id', id)
      .delete()
  }

  getCurrentDate () : Date {
    return moment().toDate()
  }

  async create (data: CreateUpdatePayload) : Promise<EntityType> {
    const id = uuid()
    const creationDateConfig = this.useCreationDate()
    const creationDate = {}

    if (creationDateConfig !== null) {
      creationDate[creationDateConfig.columnName] = this.getCurrentDate()
    }

    await this.store().insert({
      ...data,
      ...creationDate,
      id: id
    })

    return this.findById(id)
  }

  async paginate (currentPage: number, perPage: number) {
    return this.store().paginate({
      perPage: perPage,
      currentPage: currentPage,
      isLengthAware: true
    })
  }

  async update (id: string, data: CreateUpdatePayload) {
    return this.store().where('id', id).update(data)
  }
}
