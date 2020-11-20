import { Schemas } from '../auto-types'

export const treeTransformer = function (entity: Schemas.Entities.TreeEntity) : Schemas.Tree {
  return {
    id: entity.id,
    title: entity.title,
    parentId: entity.parent_id
  }
}
