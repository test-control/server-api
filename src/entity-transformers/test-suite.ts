import { Schemas } from '../auto-types'
import { formatFullDate } from '../common/date'

export const testSuiteTransformer = function (entity: Schemas.Entities.TestSuiteEntity) : Schemas.TestSuite {
  return {
    id: entity.id,
    title: entity.title,
    createdAt: formatFullDate(entity.created_at),
    elementsAmount: entity.elements_amount,
    treePath: entity.tree_path,
    description: entity.description
  }
}
