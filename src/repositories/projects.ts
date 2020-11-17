import Knex from 'knex'
import { ProjectEntity } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Omit<ProjectEntity, 'id'>

export class ProjectsRepository extends SimpleCrudRepository<ProjectEntity, CreateUpdatePayload> {
  constructor (knex: Knex) {
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
