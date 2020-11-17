import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes, testSimpleCrudRoutes } from '../api-common'
import testCaseFunc from '../../../../src/functionalities/testCaseSteps'
import { createTestCaseApi, getTestCaseApi, updateTestCaseApi } from '../../../../src/functionalities/test-cases/api'
import { deleteStepsApi, updateStepsApi } from '../../../../src/functionalities/testCaseSteps/api'
import { SimpleCrud } from '../../../../src/common'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('testCaseSteps', () => {
    describe('api', () => {
      it('all pi', async () => {
        await testSimpleCrudRoutes([
          updateStepsApi,
          deleteStepsApi
        ])
      })
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('test-cases/:testCaseId/steps')
          },
          {
            m: 'get',
            r: apiV1Route('test-cases/:testCaseId/steps')
          },
          {
            m: 'delete',
            r: apiV1Route('test-case-steps/:entityId')
          },
          {
            m: 'patch',
            r: apiV1Route('test-case-steps/:entityId')
          }
        ]

        testRoutes(
          requiredRoutes,
          testCaseFunc()
        )
      })
    })
  })
})
