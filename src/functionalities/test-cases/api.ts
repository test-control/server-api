import { CreateTestCase, GetTestCase, UpdateTestCases } from '../../auto-types'
import { testCasesRepository } from '../../repositories'
import { SimpleCrud } from '../../common'
import { testCaseTransformer } from '../../entity-transformers'
import { EntitiesNames } from '../../database'

export const createTestCaseApi = async (req:CreateTestCase.ApiRequest, res: CreateTestCase.ApiResponse) => {
  return SimpleCrud.simpleCreate({
    createCallback: testCasesRepository.bindCreate(),
    transformer: testCaseTransformer,
    entityName: EntitiesNames.TestCase,
    req,
    res
  })
}

export const getTestCaseApi = async (req:GetTestCase.ApiRequest, res: GetTestCase.ApiResponse) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: testCasesRepository.bindFindById(),
    transformerCallback: testCaseTransformer,
    entityName: EntitiesNames.TestCase,
    req,
    res
  })
}

export const updateTestCaseApi = async (req:UpdateTestCases.ApiRequest, res: UpdateTestCases.ApiResponse) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesRepository.bindFindById(),
    updateEntityCallback: testCasesRepository.bindUpdate(),
    transformerCallback: testCaseTransformer,
    entityName: EntitiesNames.TestCase,
    req,
    res
  })
}
