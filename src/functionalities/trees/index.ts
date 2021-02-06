import { IFunctionality } from '../../common'
import { Router } from 'express'
import { apiV1Route } from '../../common/routes'
import { createLeafApi, getTreeApi, listLeavesApi, listTestCasesApi, rootPathApi, updateLeafApi } from './api'

const routes = (router: Router) => {
  router.post(apiV1Route('trees/:entityId'), createLeafApi)
  router.patch(apiV1Route('trees/:entityId'), updateLeafApi[0], updateLeafApi[1])
  router.get(apiV1Route('trees/:entityId'), getTreeApi)
  router.get(apiV1Route('trees/:entityId/leaves'), listLeavesApi)
  router.get(apiV1Route('trees/:entityId/test-cases'), listTestCasesApi)
  router.get(apiV1Route('trees/:entityId/root-path'), rootPathApi)
}

export default function () : IFunctionality {
  return {
    routes: routes
  }
}
