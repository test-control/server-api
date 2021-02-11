import { Api } from '../../auto-types'
import { testCasesRepository } from '../../repositories'
import { SimpleCrud } from '../../common'
import { testCaseTransformer } from '../../entity-transformers'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'
import { CreateUpdatePayload } from '../../repositories/test-cases'

export const createTestCaseApi = async (
  req:Api.CreateTestCase.ApiRequest,
  res: Api.CreateTestCase.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleCreate({
    createCallback: testCasesRepository.bindCreate(),
    transformer: testCaseTransformer,
    entityName: EntitiesNames.TestCase
  })(req, res, next)
}

export const getTestCaseApi = async (
  req:Api.GetTestCase.ApiRequest,
  res: Api.GetTestCase.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: testCasesRepository.bindFindById(),
    transformerCallback: testCaseTransformer,
    entityName: EntitiesNames.TestCase
  })(req, res, next)
}

export const updateTestCaseApi = async (
  req:Api.UpdateTestCases.ApiRequest,
  res: Api.UpdateTestCases.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: testCasesRepository.bindFindById(),
    updateEntityCallback: testCasesRepository.bindUpdate(),
    transformerCallback: testCaseTransformer,
    entityName: EntitiesNames.TestCase
  })(req, res, next)
}

export const moveTestCaseApi = async (
  req:Api.MoveTestCase.ApiRequest,
  res: Api.MoveTestCase.ApiResponse,
  next: NextFunction
) => {
  await testCasesRepository.changeDisplayOrder(
    req.params.entityId,
    req.body.displayAfter
  )

  const entities = await testCasesRepository.getByIds([
    req.params.entityId,
    req.body.displayAfter
  ])

  await SimpleCrud.simpleRunEUpdate(
    EntitiesNames.TestCase,
    entities
  )

  res.send({})
}
