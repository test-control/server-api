import { Router } from 'express'
import { IFunctionality } from '../../common'
import { createTestCaseApi, getTestCaseApi, updateTestCaseApi } from './api'
import { apiV1Route } from '../../common/routes'

const routes = (router: Router) => {
  router.post(apiV1Route('test-cases'), createTestCaseApi)
  router.get(apiV1Route('test-cases/:entityId'), getTestCaseApi)
  router.patch(apiV1Route('test-cases/:entityId'), updateTestCaseApi)
}

export default function () : IFunctionality {
  return {
    routes: routes
  }
}
