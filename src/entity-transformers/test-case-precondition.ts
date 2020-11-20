import { Schemas } from '../auto-types'

export const testCasePreconditionTransformer = function (entity: Schemas.Entities.TestCasePreconditionEntity) : Schemas.TestCasePrecondition {
  return {
    id: entity.id,
    title: entity.title,
    testCaseId: entity.test_case_id,
    displayAfter: entity.display_after
  }
}
