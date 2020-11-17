import { TableNames } from '../database'
import Knex from 'knex'
import { ProjectTreeEntity } from '../auto-types'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<ProjectTreeEntity, 'title' | 'parent_id'>;

export class ProjectTreesRepository extends SimpleCrudRepository<ProjectTreeEntity, CreateUpdatePayload> {
  constructor (knex: Knex) {
    super(knex, TableNames.ProjectTrees)
  }

  addProjectTree (projectId: string, treeId: string) : Promise<ProjectTreeEntity> {
    return this.store().returning<ProjectTreeEntity>('*').insert({
      project_id: projectId,
      tree_id: treeId
    })
  }

  listProjectTree (projectId: string) : Promise<Array<ProjectTreeEntity>> {
    return this.store().select('*').where('project_id', projectId)
  }
}
