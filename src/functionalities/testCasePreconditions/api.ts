import {
  CreateTestCasePreconditions,
  ListTestCasePreconditions,
  DeleteTestCasePreconditions,
  UpdateTestCasePreconditions
} from '../../auto-types'
import { testCasesRepository, testCasesPreconditionsRepository } from '../../repositories'
import { ResourcesNotFound, SimpleCrud, toSnakeCaseObject } from '../../common'
import { testCasePreconditionTransformer } from '../../entity-transformers'
import { paginationTransformer } from '../../common/transformers/pagination'
import { EntitiesNames } from '../../database'

export const createPreconditionsApi = async (req:CreateTestCasePreconditions.ApiRequest, res: CreateTestCasePreconditions.ApiResponse) => {
  const testCaseId = req.params.testCaseId

  return SimpleCrud.simpleCreateManyToOne({
    relationId: testCaseId,
    transformer: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCasePrecondition,
    relationFindCallback: testCasesRepository.bindFindById(),
    createCallback: (relationId: string, data: CreateTestCasePreconditions.ApplicationJsonRequestBody) => {
      return testCasesPreconditionsRepository.create({
        ...toSnakeCaseObject(data),
        test_case_id: relationId
      })
    },
    req,
    res
  })
}

export const listPreconditionsApi = async (req:ListTestCasePreconditions.ApiRequest, res: ListTestCasePreconditions.ApiResponse) => {
  const testCaseId = req.params.testCaseId

  return SimpleCrud.simpleList({
    listCallback: () => {
      return testCasesPreconditionsRepository.getByTestCase(
        testCaseId
      )
    },
    transformerCallback: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCasePrecondition,
    req,
    res
  })
}

export const updatePreconditionsApi = async (req:UpdateTestCasePreconditions.ApiRequest, res: UpdateTestCasePreconditions.ApiResponse) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesPreconditionsRepository.bindFindById(),
    updateEntityCallback: testCasesPreconditionsRepository.bindUpdateWithDisplayAfter(),
    transformerCallback: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCase,
    req,
    res
  })
}

export const deletePreconditionsApi = async (req:DeleteTestCasePreconditions.ApiRequest, res: DeleteTestCasePreconditions.ApiResponse) => {
  return SimpleCrud.simpleDelete({
    findEntity: testCasesPreconditionsRepository.bindFindById(),
    deleteCallback: testCasesPreconditionsRepository.bindDeleteById(),
    entityName: EntitiesNames.TestCasePrecondition,
    req,
    res
  })
}
