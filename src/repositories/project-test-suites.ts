import { TableNames } from '../database'
import Knex from 'knex'
import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Schemas.Entities.ProjectTestSuiteEntity;

export class ProjectTestSuitesRepository extends SimpleCrudRepository<Schemas.Entities.ProjectTestSuiteEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.ProjectTestSuites)
  }

  bindGetRoot () {
    return this.getRoot.bind(this)
  }

  async addProjectTestSuiteTree (projectId: string, treeId: string) : Promise<Schemas.Entities.ProjectTestSuiteEntity> {
    await this.store()
      .insert({
        project_id: projectId,
        test_suite_id: treeId
      })

    return {
      project_id: projectId,
      test_suite_id: treeId
    }
  }

  getRoot (projectId: string) : Promise<Schemas.Entities.TestSuiteEntity> {
    return this.store()
      .select(TableNames.TestSuites + '.*')
      .from(TableNames.TestSuites)
      .leftJoin(TableNames.ProjectTestSuites, TableNames.TestSuites + '.id', TableNames.ProjectTestSuites + '.test_suite_id')
      .where(TableNames.ProjectTestSuites + '.project_id', projectId)
      .first()
  }

  getProject (rootId: string) : Promise<Schemas.Entities.ProjectEntity> {
    return this.store()
      .select(TableNames.Projects + '.*')
      .from(TableNames.Projects)
      .leftJoin(TableNames.ProjectTestSuites, TableNames.Projects + '.id', TableNames.ProjectTestSuites + '.project_id')
      .where(TableNames.ProjectTestSuites + '.test_suite_id', rootId)
      .first()
  }
}
