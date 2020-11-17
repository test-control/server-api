import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes, testSimpleCrudRoutes } from '../api-common'
import iFunc from '../../../../src/functionalities/testCasePreconditions'
import { createTestCaseApi, getTestCaseApi, updateTestCaseApi } from '../../../../src/functionalities/test-cases/api'
import { deleteStepsApi, updateStepsApi } from '../../../../src/functionalities/testCaseSteps/api'
import { SimpleCrud } from '../../../../src/common'
import {
  deletePreconditionsApi,
  updatePreconditionsApi
} from '../../../../src/functionalities/testCasePreconditions/api'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('testCasePreconditions', () => {
    describe('api', () => {
      it('all pi', async () => {
        await testSimpleCrudRoutes([
          updatePreconditionsApi,
          deletePreconditionsApi
        ])
      })
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('test-cases/:testCaseId/preconditions')
          },
          {
            m: 'get',
            r: apiV1Route('test-cases/:testCaseId/preconditions')
          },
          {
            m: 'delete',
            r: apiV1Route('test-case-preconditions/:entityId')
          },
          {
            m: 'patch',
            r: apiV1Route('test-case-preconditions/:entityId')
          }
        ]

        testRoutes(
          requiredRoutes,
          iFunc()
        )
      })
    })
  })
})
