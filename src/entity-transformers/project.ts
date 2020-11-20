import { Schemas } from '../auto-types'

export const projectsTransformer = function (entity: Schemas.Entities.ProjectEntity) : Schemas.Project {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description
  }
}
