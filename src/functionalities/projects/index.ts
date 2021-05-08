import { Router } from 'express'
import { EntityEvent, IFunctionality } from '../../common'
import { createProjectApi, getProjectApi, listProjectsApi, getProjectTreeRoot, updateProjectApi } from './api'
import { apiV1Route } from '../../common/routes'
import { createTreeRoot } from './events-listeners'
import { EntitiesNames } from '../../database'

const routes = (router: Router) => {
  router.post(apiV1Route('projects'), createProjectApi)
  router.get(apiV1Route('projects'), listProjectsApi)
  router.get(apiV1Route('projects/:entityId/tree-root'), getProjectTreeRoot)
  router.patch(apiV1Route('projects/:entityId'), updateProjectApi)
  router.get(apiV1Route('projects/:entityId'), getProjectApi)
}

const appEventsHandlers = [
  {
    event: EntityEvent.createdEventName(EntitiesNames.Project),
    listener: createTreeRoot
  }
]

export default function () : IFunctionality {
  return {
    routes: routes,
    appEventsHandlers: appEventsHandlers
  }
}
