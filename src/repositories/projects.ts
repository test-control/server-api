import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Omit<Schemas.Entities.ProjectEntity, 'id'>

export class ProjectsRepository extends SimpleCrudRepository<Schemas.Entities.ProjectEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.Projects)
  }

  async paginate (currentPage: number, perPage: number) {
    return this.store().paginate({
      perPage: perPage,
      currentPage: currentPage,
      isLengthAware: true
    })
  }
}
