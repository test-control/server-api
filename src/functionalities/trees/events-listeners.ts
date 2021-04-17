import { EntityEvent, InternalError } from '../../common'
import { Schemas } from '../../auto-types'
import { treesRepository } from '../../repositories'
import { extractParentFromPath } from '../../common/trees'

export const onCreatedTreeLeaf = async (event: EntityEvent<Schemas.Entities.TreeEntity>) => {
  const treePath = event.entity.tree_path
  const parentPath = extractParentFromPath(treePath)

  if (parentPath === null) {
    return
  }

  return treesRepository.incrementElementsAmountByTreePath(parentPath)
}

export const onDeletedTreeLeaf = async (event: EntityEvent<Schemas.Entities.TreeEntity>) => {
  const treePath = event.entity.tree_path
  const parentPath = extractParentFromPath(treePath)

  if (parentPath === null) {
    return
  }

  return treesRepository.decrementElementsAmountByTreePath(parentPath)
}

export const onCreatedTestCase = async (event:EntityEvent<Schemas.Entities.TestCaseEntity>) => {
  const treeId = event.entity.tree_id

  return treesRepository.incrementElementsAmountById(treeId)
}

export const onDeletedTestCase = async (event:EntityEvent<Schemas.Entities.TestCaseEntity>) => {
  const treeId = event.entity.tree_id

  return treesRepository.decrementElementsAmountById(treeId)
}
