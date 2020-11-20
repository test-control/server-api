import { Schemas } from '../auto-types'

export const testCaseTransformer = function (entity: Schemas.Entities.TestCaseEntity) : Schemas.TestCase {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description
  }
}
