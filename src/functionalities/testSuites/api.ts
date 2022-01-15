import { Api, Schemas } from '../../auto-types'
import { DomainError, ResourcesNotFound, SimpleCrud, toSnakeCaseObject, Trees } from '../../common'
import { projectTestSuitesRepository, testCasesRepository, testSuitesRepository } from '../../repositories'
import { testCaseTransformer, testSuiteTransformer } from '../../entity-transformers'
import {
  body as checkBody
} from 'express-validator'
import { requestValidationMiddleware } from '../../middlewares'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'
import { projectsTransformer } from '../../entity-transformers/project'

export const createLeafApi = async (
  req:Api.CreateTestSuiteLeaf.ApiRequest,
  res: Api.CreateTestSuiteLeaf.ApiResponse,
  next: NextFunction
) => {
  const parentId = req.params.entityId

  return SimpleCrud.simpleCreate({
    createCallback: async (data: Api.CreateTestSuiteLeaf.ApplicationJsonRequestBody) => {
      const parentLeaf = await testSuitesRepository.findById(parentId)

      if (!parentLeaf) {
        throw new ResourcesNotFound({
          relationId: parentId
        })
      }

      return testSuitesRepository.createLeaf(parentLeaf.tree_path, toSnakeCaseObject(data))
    },
    transformer: testSuiteTransformer,
    entityName: EntitiesNames.TestSuite
  })(req, res, next)
}

export const updateLeafApi = [
  requestValidationMiddleware([
    checkBody('parentId').custom(async (parentId, { req }) => {
      if (!parentId) {
        return
      }

      const entityId = req.params.entityId

      if (entityId === parentId) {
        throw new DomainError(Schemas.DomainResponsesCodes.ErrorCodes.sameId)
      }

      const currentRow = await testSuitesRepository.findById(entityId)
      const parentRow = await testSuitesRepository.findById(parentId)

      if (!currentRow || !parentRow) {
        throw new Error(Schemas.DomainResponsesCodes.ErrorCodes.noEntity)
      }

      const currentRoot = Trees.extractRootFromPath(currentRow.tree_path)
      const newParentRoot = Trees.extractRootFromPath(parentRow.tree_path)

      if (currentRoot !== newParentRoot) {
        throw new Error(Schemas.DomainResponsesCodes.ErrorCodes.differentRoot)
      }
    })
  ]),
  async (
    req: Api.UpdateTestSuiteLeaf.ApiRequest,
    res: Api.UpdateTestSuiteLeaf.ApiResponse,
    next: NextFunction
  ) => {
    return SimpleCrud.simpleUpdate({
      findEntityCallback: testSuitesRepository.bindFindById(),
      updateEntityCallback: testSuitesRepository.bindUpdate(),
      entityName: EntitiesNames.TestSuite,
      transformerCallback: testSuiteTransformer
    })(req, res, next)
  }
]

export const listLeavesApi = async (
  req: Api.ListTestSuiteLeaves.ApiRequest,
  res: Api.ListTestSuiteLeaves.ApiResponse,
  next: NextFunction
) => {
  const parentId = req.params.entityId

  return SimpleCrud.simplePaginate({
    paginateCallback: (currentPage, perPage) => {
      return testSuitesRepository.paginateLeaves(
        parentId,
        currentPage,
        perPage
      )
    },
    entityName: EntitiesNames.TestSuite,
    transformerCallback: testSuiteTransformer
  })(req, res, next)
}

export const listTestCasesApi = async (
  req: Api.ListTestSuiteTestCases.ApiRequest,
  res: Api.ListTestSuiteTestCases.ApiResponse,
  next: NextFunction
) => {
  const treeId = req.params.entityId

  return SimpleCrud.simplePaginate({
    paginateCallback: (currentPage, perPage) => {
      return testCasesRepository.paginateFromTree(
        treeId,
        currentPage,
        perPage
      )
    },
    entityName: EntitiesNames.TestCase,
    transformerCallback: testCaseTransformer
  })(req, res, next)
}

export const rootPathApi = async (
  req: Api.GetTestSuiteRootPath.ApiRequest,
  res: Api.GetTestSuiteRootPath.ApiResponse,
  next: NextFunction
) => {
  const leafId = req.params.entityId

  return SimpleCrud.simpleList({
    listCallback: async () => {
      return testSuitesRepository.getAllLeavesFromRoot(
        leafId
      )
    },
    transformerCallback: testSuiteTransformer,
    entityName: EntitiesNames.TestSuite
  })(req, res, next)
}

export const getTreeApi = async (
  req: Api.GetTestSuite.ApiRequest,
  res: Api.GetTestSuite.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: testSuitesRepository.bindFindById(),
    transformerCallback: testSuiteTransformer,
    entityName: EntitiesNames.TestSuite
  })(req, res, next)
}

export const getTreeProject = async (
  req: Api.GetTestSuiteGetProject.ApiRequest,
  res: Api.GetTestSuiteGetProject.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: async (treeId: string) => {
      const treeRoot = await testSuitesRepository.getRoot(treeId)

      if (!treeRoot) {
        throw new ResourcesNotFound({
          leafId: treeId
        })
      }

      return projectTestSuitesRepository.getProject(treeRoot.id)
    },
    transformerCallback: projectsTransformer,
    entityName: EntitiesNames.Project
  })(req, res, next)
}

export const getLeafParentApi = async (
  req: Api.GetTestSuiteParent.ApiRequest,
  res: Api.GetTestSuiteParent.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: testSuitesRepository.findParentById.bind(testSuitesRepository),
    transformerCallback: testSuiteTransformer,
    entityName: EntitiesNames.TestSuite
  })(req, res, next)
}
