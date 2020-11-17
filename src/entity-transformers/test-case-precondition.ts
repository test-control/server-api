import { TestCasePreconditionEntity, TestCasePrecondition as ApiEntity } from '../auto-types'

export const testCasePreconditionTransformer = function (entity: TestCasePreconditionEntity) : ApiEntity {
  return {
    id: entity.id,
    title: entity.title,
    testCaseId: entity.test_case_id,
    displayAfter: entity.display_after
  }
}
