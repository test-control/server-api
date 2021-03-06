import { Api, Schemas } from '../../auto-types'
import { DomainError, ResourcesNotFound, SimpleCrud, toSnakeCaseObject, Trees } from '../../common'
import { projectTreesRepository, testCasesRepository, treesRepository } from '../../repositories'
import { testCaseTransformer, treeTransformer } from '../../entity-transformers'
import {
  body as checkBody
} from 'express-validator'
import { requestValidationMiddleware } from '../../middlewares'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'
import { projectsTransformer } from '../../entity-transformers/project'

export const createLeafApi = async (
  req:Api.CreateTreeLeaf.ApiRequest,
  res: Api.CreateTreeLeaf.ApiResponse,
  next: NextFunction
) => {
  const parentId = req.params.entityId

  return SimpleCrud.simpleCreate({
    createCallback: async (data: Api.CreateTreeLeaf.ApplicationJsonRequestBody) => {
      const parentLeaf = await treesRepository.findById(parentId)

      if (!parentLeaf) {
        throw new ResourcesNotFound({
          relationId: parentId
        })
      }

      return treesRepository.createLeaf(parentLeaf.tree_path, toSnakeCaseObject(data))
    },
    transformer: treeTransformer,
    entityName: EntitiesNames.Tree
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

      const currentRow = await treesRepository.findById(entityId)
      const parentRow = await treesRepository.findById(parentId)

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
    req: Api.UpdateTreeLeaf.ApiRequest,
    res: Api.UpdateTreeLeaf.ApiResponse,
    next: NextFunction
  ) => {
    return SimpleCrud.simpleUpdate({
      findEntityCallback: treesRepository.bindFindById(),
      updateEntityCallback: treesRepository.bindUpdate(),
      entityName: EntitiesNames.Tree,
      transformerCallback: treeTransformer
    })(req, res, next)
  }
]

export const listLeavesApi = async (
  req: Api.ListTreeLeaves.ApiRequest,
  res: Api.ListTreeLeaves.ApiResponse,
  next: NextFunction
) => {
  const parentId = req.params.entityId

  return SimpleCrud.simplePaginate({
    paginateCallback: (currentPage, perPage) => {
      return treesRepository.paginateLeaves(
        parentId,
        currentPage,
        perPage
      )
    },
    entityName: EntitiesNames.Tree,
    transformerCallback: treeTransformer
  })(req, res, next)
}

export const listTestCasesApi = async (
  req: Api.ListTreeTestCases.ApiRequest,
  res: Api.ListTreeTestCases.ApiResponse,
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
  req: Api.GetTreeRootPath.ApiRequest,
  res: Api.GetTreeRootPath.ApiResponse,
  next: NextFunction
) => {
  const leafId = req.params.entityId

  return SimpleCrud.simpleList({
    listCallback: async () => {
      return treesRepository.getAllLeavesFromRoot(
        leafId
      )
    },
    transformerCallback: treeTransformer,
    entityName: EntitiesNames.Tree
  })(req, res, next)
}

export const getTreeApi = async (
  req: Api.GetTree.ApiRequest,
  res: Api.GetTree.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: treesRepository.bindFindById(),
    transformerCallback: treeTransformer,
    entityName: EntitiesNames.Tree
  })(req, res, next)
}

export const getTreeProject = async (
  req: Api.GetTreeGetProject.ApiRequest,
  res: Api.GetTreeGetProject.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: async (treeId: string) => {
      const treeRoot = await treesRepository.getRoot(treeId)

      if (!treeRoot) {
        throw new ResourcesNotFound({
          leafId: treeId
        })
      }

      return projectTreesRepository.getProject(treeRoot.id)
    },
    transformerCallback: projectsTransformer,
    entityName: EntitiesNames.Project
  })(req, res, next)
}
