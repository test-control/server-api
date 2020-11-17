import { TestCaseStepEntity, TestCaseStep as ApiEntity } from '../auto-types'

export const testCaseStepTransformer = function (entity: TestCaseStepEntity) : ApiEntity {
  return {
    id: entity.id,
    title: entity.title,
    testCaseId: entity.test_case_id,
    displayAfter: entity.display_after
  }
}
