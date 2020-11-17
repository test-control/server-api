import { TreeEntity, Tree } from '../auto-types'

export const treeTransformer = function (entity: TreeEntity) : Tree {
  return {
    id: entity.id,
    title: entity.title,
    parentId: entity.parent_id
  }
}
