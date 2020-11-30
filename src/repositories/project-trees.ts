import { TableNames } from '../database'
import Knex from 'knex'
import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<Schemas.Entities.ProjectTreeEntity, 'title' | 'parent_id'>;

export class ProjectTreesRepository extends SimpleCrudRepository<Schemas.Entities.ProjectTreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.ProjectTrees)
  }

  bindGetRoot () {
    return this.getRoot.bind(this)
  }

  addProjectTree (projectId: string, treeId: string) : Promise<Schemas.Entities.ProjectTreeEntity> {
    return this.store().returning<Schemas.Entities.ProjectTreeEntity>('*').insert({
      project_id: projectId,
      tree_id: treeId
    })
  }

  getRoot (projectId: string) : Promise<Schemas.Entities.TreeEntity> {
    return this.store().select(TableNames.Trees + '.*')
      .from(TableNames.Trees)
      .leftJoin(TableNames.ProjectTrees, TableNames.Trees + '.id', TableNames.ProjectTrees + '.tree_id')
      .where(TableNames.ProjectTrees + '.project_id', projectId)
      .first()
  }
}
