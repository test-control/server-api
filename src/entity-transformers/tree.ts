import { Schemas } from '../auto-types'
import moment from 'moment'

export const treeTransformer = function (entity: Schemas.Entities.TreeEntity) : Schemas.Tree {
  return {
    id: entity.id,
    title: entity.title,
    createdAt: moment(entity.created_at).format('YYYY-MM-DD hh:mm:ss')
  }
}
