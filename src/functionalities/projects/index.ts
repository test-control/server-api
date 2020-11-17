import { Router } from 'express'
import { EntityEvent, IFunctionality } from '../../common'
import { createProjectApi, listProjectsApi, listProjectTree, updateProjectApi } from './api'
import { apiV1Route } from '../../common/routes'
import { createTreeRoot } from './events-listeners'
import { EntitiesNames } from '../../database'

const routes = (router: Router) => {
  router.post(apiV1Route('projects'), createProjectApi)
  router.get(apiV1Route('projects'), listProjectsApi)
  router.get(apiV1Route('projects/:projectId/tree'), listProjectTree)
  router.patch(apiV1Route('projects/:projectId'), updateProjectApi)
}

const appEventsHandlers = {}

appEventsHandlers[EntityEvent.createdEventName(EntitiesNames.Project)] = [
  createTreeRoot
]

export default function () : IFunctionality {
  return {
    routes: routes,
    appEventsHandlers: appEventsHandlers
  }
}
