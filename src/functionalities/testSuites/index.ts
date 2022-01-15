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
  updateLeafApi,
  getLeafParentApi
} from './api'
import { EntitiesNames } from '../../database'
import { onCreatedTreeLeaf, onDeletedTreeLeaf } from './events-listeners'
import { validSessionMiddleware } from '../sessions/helpers/valid-session'

const routes = (router: Router) => {
  router.all([
    apiV1Route('test-suites/*')
  ], [validSessionMiddleware])

  router.post(apiV1Route('test-suites/:entityId'), createLeafApi)
  router.patch(apiV1Route('test-suites/:entityId'), updateLeafApi[0], updateLeafApi[1])
  router.get(apiV1Route('test-suites/:entityId'), getTreeApi)
  router.get(apiV1Route('test-suites/:entityId/leaves'), listLeavesApi)
  router.get(apiV1Route('test-suites/:entityId/test-cases'), listTestCasesApi)
  router.get(apiV1Route('test-suites/:entityId/root-path'), rootPathApi)
  router.get(apiV1Route('test-suites/:entityId/get-project'), getTreeProject)
  router.get(apiV1Route('test-suites/:entityId/get-parent'), getLeafParentApi)
}

const appEventsHandlers = [
  {
    event: EntityEvent.createdEventName(EntitiesNames.TestSuite),
    listener: onCreatedTreeLeaf
  },
  {
    event: EntityEvent.deletedEventName(EntitiesNames.TestSuite),
    listener: onDeletedTreeLeaf
  }
]

export default function () : IFunctionality {
  return {
    routes: routes,
    appEventsHandlers: appEventsHandlers
  }
}
