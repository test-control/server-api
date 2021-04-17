import { Schemas } from '../auto-types'
import { formatFullDate } from '../common/date'

export const treeTransformer = function (entity: Schemas.Entities.TreeEntity) : Schemas.Tree {
  return {
    id: entity.id,
    title: entity.title,
    createdAt: formatFullDate(entity.created_at),
    elementsAmount: entity.elements_amount,
    treePath: entity.tree_path
  }
}
