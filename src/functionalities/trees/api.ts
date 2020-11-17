import { CreateTreeLeaf, UpdateTreeLeaf, ListTreeLeaves } from '../../auto-types'
import { ResourcesNotFound, SimpleCrud, toSnakeCaseObject } from '../../common'
import { treesRepository } from '../../repositories'
import { treeTransformer } from '../../entity-transformers'
import {
  body as checkBody
} from 'express-validator'
import { requestValidationMiddleware } from '../../middlewares'
import { EntitiesNames } from '../../database'

export const createLeafApi = async (req:CreateTreeLeaf.ApiRequest, res: CreateTreeLeaf.ApiResponse) => {
  const parentId = req.params.entityId

  return SimpleCrud.simpleCreate({
    createCallback: async (data: CreateTreeLeaf.ApplicationJsonRequestBody) => {
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

/**
 * todo: error message
 */
export const updateLeafApi = [
  requestValidationMiddleware([
    checkBody('parentId').custom(async (parentId, { req }) => {
      const entityId = req.params.entityId

      if (entityId === parentId) {
        throw new Error('Cannot assign the same id')
      }

      const currentRow = await treesRepository.findById(entityId)
      const parentRow = await treesRepository.findById(parentId)

      if (!currentRow || !parentRow) {
        throw new Error('Entitty does not exists')
      }

      const currentRootId = currentRow.root_id || currentRow.id
      const newRootId = parentRow.root_id || parentRow.id

      if (currentRootId !== newRootId) {
        throw new Error('Root id must be the same')
      }
    })
  ]),
  async (req: UpdateTreeLeaf.ApiRequest, res: UpdateTreeLeaf.ApiResponse) => {
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

export const listLeavesApi = async (req: ListTreeLeaves.ApiRequest, res: ListTreeLeaves.ApiResponse) => {
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
