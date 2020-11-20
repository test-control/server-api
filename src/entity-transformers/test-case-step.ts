import { Schemas } from '../auto-types'

export const testCaseStepTransformer = function (entity: Schemas.Entities.TestCaseStepEntity) : Schemas.TestCaseStep {
  return {
    id: entity.id,
    title: entity.title,
    testCaseId: entity.test_case_id,
    displayAfter: entity.display_after
  }
}
