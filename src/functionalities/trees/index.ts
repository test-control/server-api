import { EntityEvent, IFunctionality } from '../../common'
import { Router } from 'express'
import { apiV1Route } from '../../common/routes'
import {
  createLeafApi,
  getTreeApi,
  getTreeProject,
  listLeavesApi,
  listTestCasesApi,
  rootPathApi,
  updateLeafApi
} from './api'
import { EntitiesNames } from '../../database'
import { onCreatedTestCase, onCreatedTreeLeaf, onDeletedTestCase, onDeletedTreeLeaf } from './events-listeners'
import { validSessionMiddleware } from '../sessions/helpers/valid-session'

const routes = (router: Router) => {
  router.all([
    apiV1Route('trees/*')
  ], [validSessionMiddleware])

  router.post(apiV1Route('trees/:entityId'), createLeafApi)
  router.patch(apiV1Route('trees/:entityId'), updateLeafApi[0], updateLeafApi[1])
  router.get(apiV1Route('trees/:entityId'), getTreeApi)
  router.get(apiV1Route('trees/:entityId/leaves'), listLeavesApi)
  router.get(apiV1Route('trees/:entityId/test-cases'), listTestCasesApi)
  router.get(apiV1Route('trees/:entityId/root-path'), rootPathApi)
  router.get(apiV1Route('trees/:entityId/get-project'), getTreeProject)
}

const appEventsHandlers = [
  {
    event: EntityEvent.createdEventName(EntitiesNames.Tree),
    listener: onCreatedTreeLeaf
  },
  {
    event: EntityEvent.deletedEventName(EntitiesNames.Tree),
    listener: onDeletedTreeLeaf
  },
  {
    event: EntityEvent.createdEventName(EntitiesNames.TestCase),
    listener: onCreatedTestCase
  },
  {
    event: EntityEvent.deletedEventName(EntitiesNames.TestCase),
    listener: onDeletedTestCase
  }
]

export default function () : IFunctionality {
  return {
    routes: routes,
    appEventsHandlers: appEventsHandlers
  }
}
