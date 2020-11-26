import { Api } from '../../auto-types'
import { testCasesRepository, testCasesStepsRepository } from '../../repositories'
import { ResourcesNotFound, SimpleCrud, toSnakeCaseObject } from '../../common'
import { testCaseStepTransformer } from '../../entity-transformers'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'

export const createStepsApi = async (
  req:Api.CreateTestCaseSteps.ApiRequest,
  res: Api.CreateTestCaseSteps.ApiResponse,
  next: NextFunction
) => {
  const testCaseId = req.params.testCaseId

  return SimpleCrud.simpleCreateManyToOne({
    createCallback: (relationId: string, data: Api.CreateTestCaseSteps.ApplicationJsonRequestBody) => {
      return testCasesStepsRepository.create({
        ...toSnakeCaseObject(data),
        test_case_id: relationId
      })
    },
    transformer: testCaseStepTransformer,
    entityName: EntitiesNames.TestCaseStep,
    relationId: testCaseId,
    relationFindCallback: testCasesRepository.bindFindById()
  })(req, res, next)
}

export const listStepsApi = async (
  req:Api.ListTestCaseSteps.ApiRequest,
  res: Api.ListTestCaseSteps.ApiResponse,
  next: NextFunction
) => {
  const testCaseId = req.params.testCaseId

  return SimpleCrud.simpleList({
    listCallback: () => {
      return testCasesStepsRepository.getByTestCase(
        testCaseId
      )
    },
    transformerCallback: testCaseStepTransformer,
    entityName: EntitiesNames.TestCaseStep
  })(req, res, next)
}

export const updateStepsApi = async (
  req:Api.UpdateTestCaseSteps.ApiRequest,
  res: Api.UpdateTestCaseSteps.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesStepsRepository.findById.bind(testCasesStepsRepository),
    updateEntityCallback: testCasesStepsRepository.updateWithDisplayAfter.bind(testCasesStepsRepository),
    transformerCallback: testCaseStepTransformer,
    entityName: EntitiesNames.TestCaseStep
  })(req, res, next)
}

export const deleteStepsApi = async (
  req:Api.DeleteTestCaseSteps.ApiRequest,
  res: Api.DeleteTestCaseSteps.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleDelete({
    findEntity: testCasesStepsRepository.findById.bind(testCasesStepsRepository),
    deleteCallback: testCasesStepsRepository.deleteById.bind(testCasesStepsRepository),
    entityName: EntitiesNames.TestCaseStep
  })(req, res, next)
}
