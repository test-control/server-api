import { TableNames } from '../database'
import Knex from 'knex'
import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Schemas.Entities.ProjectTreeEntity;

export class ProjectTreesRepository extends SimpleCrudRepository<Schemas.Entities.ProjectTreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.ProjectTrees)
  }

  bindGetRoot () {
    return this.getRoot.bind(this)
  }

  async addProjectTree (projectId: string, treeId: string) : Promise<Schemas.Entities.ProjectTreeEntity> {
    await this.store()
      .insert({
        project_id: projectId,
        tree_id: treeId
      })

    return {
      project_id: projectId,
      tree_id: treeId
    }
  }

  getRoot (projectId: string) : Promise<Schemas.Entities.TreeEntity> {
    return this.store()
      .select(TableNames.Trees + '.*')
      .from(TableNames.Trees)
      .leftJoin(TableNames.ProjectTrees, TableNames.Trees + '.id', TableNames.ProjectTrees + '.tree_id')
      .where(TableNames.ProjectTrees + '.project_id', projectId)
      .first()
  }

  getProject (rootId: string) : Promise<Schemas.Entities.ProjectEntity> {
    return this.store()
      .select(TableNames.Projects + '.*')
      .from(TableNames.Projects)
      .leftJoin(TableNames.ProjectTrees, TableNames.Projects + '.id', TableNames.ProjectTrees + '.project_id')
      .where(TableNames.ProjectTrees + '.tree_id', rootId)
      .first()
  }
}
