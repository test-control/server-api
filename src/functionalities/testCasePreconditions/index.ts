import { Router } from 'express'
import { IFunctionality } from '../../common'
import {
  createPreconditionsApi,
  listPreconditionsApi,
  deletePreconditionsApi,
  updatePreconditionsApi
} from './api'
import { apiV1Route } from '../../common/routes'

const routes = (router: Router) => {
  router.post(apiV1Route('test-cases/:testCaseId/preconditions'), createPreconditionsApi)
  router.get(apiV1Route('test-cases/:testCaseId/preconditions'), listPreconditionsApi)
  router.delete(apiV1Route('test-case-preconditions/:entityId'), deletePreconditionsApi)
  router.patch(apiV1Route('test-case-preconditions/:entityId'), updatePreconditionsApi)
}

export default function () : IFunctionality {
  return {
    routes: routes
  }
}
