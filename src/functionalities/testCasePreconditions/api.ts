import { Api } from '../../auto-types'
import { testCasesRepository, testCasesPreconditionsRepository } from '../../repositories'
import { SimpleCrud, toSnakeCaseObject } from '../../common'
import { testCasePreconditionTransformer } from '../../entity-transformers'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'

export const createPreconditionsApi = async (
  req:Api.CreateTestCasePreconditions.ApiRequest,
  res: Api.CreateTestCasePreconditions.ApiResponse,
  next: NextFunction
) => {
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
    }
  })(req, res, next)
}

export const listPreconditionsApi = async (
  req:Api.ListTestCasePreconditions.ApiRequest,
  res: Api.ListTestCasePreconditions.ApiResponse,
  next: NextFunction
) => {
  const testCaseId = req.params.testCaseId
  return SimpleCrud.simpleList({
    listCallback: () => {
      return testCasesPreconditionsRepository.getByTestCase(
        testCaseId
      )
    },
    transformerCallback: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCasePrecondition
  })(req, res, next)
}

export const updatePreconditionsApi = async (
  req:Api.UpdateTestCasePreconditions.ApiRequest,
  res: Api.UpdateTestCasePreconditions.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesPreconditionsRepository.bindFindById(),
    updateEntityCallback: testCasesPreconditionsRepository.bindUpdateWithDisplayAfter(),
    transformerCallback: testCasePreconditionTransformer,
    entityName: EntitiesNames.TestCase
  })(req, res, next)
}

export const deletePreconditionsApi = async (
  req:Api.DeleteTestCasePreconditions.ApiRequest,
  res: Api.DeleteTestCasePreconditions.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleDelete({
    findEntity: testCasesPreconditionsRepository.bindFindById(),
    deleteCallback: testCasesPreconditionsRepository.bindDeleteById(),
    entityName: EntitiesNames.TestCasePrecondition
  })(req, res, next)
}
