import { Api, Schemas } from '../../auto-types'
import { DomainError, ResourcesNotFound, SimpleCrud, toSnakeCaseObject } from '../../common'
import { treesRepository } from '../../repositories'
import { treeTransformer } from '../../entity-transformers'
import {
  body as checkBody
} from 'express-validator'
import { requestValidationMiddleware } from '../../middlewares'
import { EntitiesNames } from '../../database'

export const createLeafApi = async (req:Api.CreateTreeLeaf.ApiRequest, res: Api.CreateTreeLeaf.ApiResponse) => {
  const parentId = req.params.entityId

  return SimpleCrud.simpleCreate({
    createCallback: async (data: Api.CreateTreeLeaf.ApplicationJsonRequestBody) => {
      const parentLeaf = await treesRepository.findById(parentId)

      if (!parentLeaf) {
        throw new ResourcesNotFound({
          relationId: parentId
        })
      }

      return treesRepository.create({
        parent_id: parentLeaf.id,
        root_id: parentLeaf.root_id || parentLeaf.id,
        ...toSnakeCaseObject(data)
      })
    },
    transformer: treeTransformer,
    entityName: EntitiesNames.Tree,
    req,
    res
  })
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

      const currentRootId = currentRow.root_id || currentRow.id
      const newRootId = parentRow.root_id || parentRow.id

      if (currentRootId !== newRootId) {
        throw new Error(Schemas.DomainResponsesCodes.ErrorCodes.differentRoot)
      }
    })
  ]),
  async (req: Api.UpdateTreeLeaf.ApiRequest, res: Api.UpdateTreeLeaf.ApiResponse) => {
    return SimpleCrud.simpleUpdate({
      findEntityCallback: treesRepository.bindFindById(),
      updateEntityCallback: treesRepository.bindUpdate(),
      entityName: EntitiesNames.Tree,
      transformerCallback: treeTransformer,
      req,
      res
    })
  }
]

export const listLeavesApi = async (req: Api.ListTreeLeaves.ApiRequest, res: Api.ListTreeLeaves.ApiResponse) => {
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
    transformerCallback: treeTransformer,
    req,
    res
  })
}
