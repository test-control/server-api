import { projectTreesRepository, treesRepository } from '../../repositories'
import { EntityEvent } from '../../common'
import { Schemas } from '../../auto-types'
import moment from 'moment'

export const createTreeRoot = async (event: EntityEvent<Schemas.Entities.ProjectEntity>) => {
  const tree = await treesRepository.createParent({
    title: 'root',
    created_at: moment().format()
  })

  return projectTreesRepository.addProjectTree(
    event.entity.id,
    tree.id
  )
}
