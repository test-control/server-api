import { Router } from 'express'
import { IFunctionality } from '../../common'
import { createTestCaseApi, getTestCaseApi, moveTestCaseApi, updateTestCaseApi } from './api'
import { apiV1Route } from '../../common/routes'
import { validSessionMiddleware } from '../sessions/helpers/valid-session'

const routes = (router: Router) => {
  router.all([
    apiV1Route('test-cases'),
    apiV1Route('test-cases/*')
  ], [validSessionMiddleware])

  router.post(apiV1Route('test-cases'), createTestCaseApi)
  router.get(apiV1Route('test-cases/:entityId'), getTestCaseApi)
  router.patch(apiV1Route('test-cases/:entityId'), updateTestCaseApi)
  router.post(apiV1Route('test-cases/:entityId/move'), moveTestCaseApi)
}

export default function () : IFunctionality {
  return {
    routes: routes
  }
}
