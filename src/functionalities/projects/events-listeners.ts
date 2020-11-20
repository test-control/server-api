import { projectTreesRepository, treesRepository } from '../../repositories'
import { EntityEvent } from '../../common'
import { Schemas } from '../../auto-types'

export const createTreeRoot = async (event: EntityEvent<Schemas.Entities.ProjectEntity>) => {
  const tree = await treesRepository.create({
    title: 'root'
  })

  await projectTreesRepository.addProjectTree(
    event.entity.id,
    tree.id
  )
}
