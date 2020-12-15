import { Api, Schemas } from '../../auto-types'
import { DomainError, ResourcesNotFound, SimpleCrud, toSnakeCaseObject, Trees } from '../../common'
import { treesRepository } from '../../repositories'
import { treeTransformer } from '../../entity-transformers'
import {
  body as checkBody
} from 'express-validator'
import { requestValidationMiddleware } from '../../middlewares'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'

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
