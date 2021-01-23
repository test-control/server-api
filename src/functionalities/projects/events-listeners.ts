import { projectTreesRepository, treesRepository } from '../../repositories'
import { EntityEvent, InternalError } from '../../common'
import { Schemas } from '../../auto-types'
import moment from 'moment'

export const createTreeRoot = async (event: EntityEvent<Schemas.Entities.ProjectEntity>) => {
  const tree = await treesRepository.createParent({
    title: 'root',
    created_at: moment().format()
  })

  if (!tree) {
    throw new InternalError({
      info: 'cannot create tree root',
      event: event
    })
  }

  return projectTreesRepository.addProjectTree(
    event.entity.id,
    tree.id
  )
}
