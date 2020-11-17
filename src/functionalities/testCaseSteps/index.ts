import { Router } from 'express'
import { IFunctionality } from '../../common'
import {
  createStepsApi,
  listStepsApi,
  deleteStepsApi,
  updateStepsApi
} from './api'
import { apiV1Route } from '../../common/routes'

const routes = (router: Router) => {
  router.post(apiV1Route('test-cases/:testCaseId/steps'), createStepsApi)
  router.get(apiV1Route('test-cases/:testCaseId/steps'), listStepsApi)
  router.delete(apiV1Route('test-case-steps/:entityId'), deleteStepsApi)
  router.patch(apiV1Route('test-case-steps/:entityId'), updateStepsApi)
}

export default function () : IFunctionality {
  return {
    routes: routes
  }
}
