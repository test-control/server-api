import { TestCaseEntity, TestCase as ApiEntity } from '../auto-types'

export const testCaseTransformer = function (entity: TestCaseEntity) : ApiEntity {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description
  }
}
