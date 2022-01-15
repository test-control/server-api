import { EntityEvent } from '../../common'
import { Schemas } from '../../auto-types'
import { testSuitesRepository } from '../../repositories'
import { extractParentFromPath } from '../../common/trees'

export const onCreatedTreeLeaf = async (event: EntityEvent<Schemas.Entities.TestSuiteEntity>) => {
  const treePath = event.entity.tree_path
  const parentPath = extractParentFromPath(treePath)

  if (parentPath === null) {
    return
  }

  return testSuitesRepository.incrementElementsAmountByTreePath(parentPath)
}

export const onDeletedTreeLeaf = async (event: EntityEvent<Schemas.Entities.TestSuiteEntity>) => {
  const treePath = event.entity.tree_path
  const parentPath = extractParentFromPath(treePath)

  if (parentPath === null) {
    return
  }

  return testSuitesRepository.decrementElementsAmountByTreePath(parentPath)
}
