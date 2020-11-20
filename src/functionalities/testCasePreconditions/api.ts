import { Api } from '../../auto-types'
import { testCasesRepository, testCasesPreconditionsRepository } from '../../repositories'
import { ResourcesNotFound, SimpleCrud, toSnakeCaseObject } from '../../common'
import { testCasePreconditionTransformer } from '../../entity-transformers'
import { paginationTransformer } from '../../common/transformers/pagination'
import { EntitiesNames } from '../../database'

export const createPreconditionsApi = async (req:Api.CreateTestCasePreconditions.ApiRequest, res: Api.CreateTestCasePreconditions.ApiResponse) => {
  const testCaseId = req.params.testCaseId

  return SimpleCrud.simpleCreateManyToOne({
    relationId: testCaseId,
    transformer: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCasePrecondition,
    relationFindCallback: testCasesRepository.bindFindById(),
    createCallback: (relationId: string, data: Api.CreateTestCasePreconditions.ApplicationJsonRequestBody) => {
      return testCasesPreconditionsRepository.create({
        ...toSnakeCaseObject(data),
        test_case_id: relationId
      })
    },
    req,
    res
  })
}

export const listPreconditionsApi = async (req:Api.ListTestCasePreconditions.ApiRequest, res: Api.ListTestCasePreconditions.ApiResponse) => {
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

export const updatePreconditionsApi = async (req:Api.UpdateTestCasePreconditions.ApiRequest, res: Api.UpdateTestCasePreconditions.ApiResponse) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesPreconditionsRepository.bindFindById(),
    updateEntityCallback: testCasesPreconditionsRepository.bindUpdateWithDisplayAfter(),
    transformerCallback: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCase,
    req,
    res
  })
}

export const deletePreconditionsApi = async (req:Api.DeleteTestCasePreconditions.ApiRequest, res: Api.DeleteTestCasePreconditions.ApiResponse) => {
  return SimpleCrud.simpleDelete({
    findEntity: testCasesPreconditionsRepository.bindFindById(),
    deleteCallback: testCasesPreconditionsRepository.bindDeleteById(),
    entityName: EntitiesNames.TestCasePrecondition,
    req,
    res
  })
}
