import { projectTestSuitesRepository, testSuitesRepository } from '../../repositories'
import { EntityEvent, InternalError } from '../../common'
import { Schemas } from '../../auto-types'
import moment from 'moment'

export const createTestSuiteTreeRoot = async (event: EntityEvent<Schemas.Entities.ProjectEntity>) => {
  const tree = await testSuitesRepository.createParent({
    title: 'root',
    created_at: moment().format()
  })

  if (!tree) {
    throw new InternalError({
      info: 'cannot create tree root',
      event: event
    })
  }

  return projectTestSuitesRepository.addProjectTestSuiteTree(
    event.entity.id,
    tree.id
  )
}
