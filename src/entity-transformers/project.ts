import { ProjectEntity, Project as ApiEntity } from '../auto-types'

export const projectsTransformer = function (entity: ProjectEntity) : ApiEntity {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description
  }
}
