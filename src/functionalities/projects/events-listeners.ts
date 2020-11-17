import { projectTreesRepository, treesRepository } from '../../repositories'
import { EntityEvent } from '../../common'
import { ProjectEntity } from '../../auto-types'

export const createTreeRoot = async (event: EntityEvent<ProjectEntity>) => {
  const tree = await treesRepository.create({
    title: 'root'
  })

  await projectTreesRepository.addProjectTree(
    event.entity.id,
    tree.id
  )
}
