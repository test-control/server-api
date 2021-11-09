import { EntityEvent, EntityEventUpdated } from '../../common'
import { EntitiesNames } from '../../database'
import { entitiesHistory } from '../../repositories'
import { Action } from '../../auto-types/schemas/entities'
import { Schemas } from '../../auto-types'

type EntityHistoryRow = Omit<Schemas.Entities.EntitiesHistory, 'id'>

export const onEntityCreated = async (event: EntityEvent<any>) => {
  const entityName = event.getEntityName()

  if (entityName === EntitiesNames.EntitiesHistory) {
    return
  }

  await entitiesHistory.create(setAdditionalFields(event, {
    action: Action.created,
    entity_name: entityName,
    entity_id: event.entity.id,
    new_values: event.entity,
    created_at: (new Date()).toLocaleString()
  }))
}

export const onEntityUpdated = async (event: EntityEventUpdated<any>) => {
  const entityName = event.getEntityName()

  if (entityName === EntitiesNames.EntitiesHistory) {
    return
  }

  await entitiesHistory.create(setAdditionalFields(event, {
    action: Action.updated,
    entity_name: entityName,
    entity_id: event.entity.id,
    new_values: event.updatedFields,
    created_at: (new Date()).toLocaleString()
  }))
}

export const onEntityDeleted = async (event: EntityEvent<any>) => {
  const entityName = event.getEntityName()

  if (entityName === EntitiesNames.EntitiesHistory) {
    return
  }

  await entitiesHistory.create(setAdditionalFields(event, {
    action: Action.deleted,
    entity_name: entityName,
    entity_id: event.entity.id,
    new_values: {},
    created_at: (new Date()).toLocaleString()
  }))
}

const setAdditionalFields = (event: EntityEvent<any>, data:EntityHistoryRow) : EntityHistoryRow => {
  const accountContext = event.getAccountContext()

  if (!accountContext) {
    return data
  }

  data.account_id = accountContext.accountId

  return data
}
