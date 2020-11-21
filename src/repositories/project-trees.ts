import { TableNames } from '../database'
import Knex from 'knex'
import { Schemas } from '../auto-types'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<Schemas.Entities.ProjectTreeEntity, 'title' | 'parent_id'>;

export class ProjectTreesRepository extends SimpleCrudRepository<Schemas.Entities.ProjectTreeEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.ProjectTrees)
  }

  addProjectTree (projectId: string, treeId: string) : Promise<Schemas.Entities.ProjectTreeEntity> {
    return this.store().returning<Schemas.Entities.ProjectTreeEntity>('*').insert({
      project_id: projectId,
      tree_id: treeId
    })
  }

  listProjectTree (projectId: string) : Promise<Array<Schemas.Entities.ProjectTreeEntity>> {
    return this.store().select('*').where('project_id', projectId)
  }
}
