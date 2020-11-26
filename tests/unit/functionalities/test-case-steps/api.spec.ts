import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'
import testCaseFunc from '../../../../src/functionalities/testCaseSteps'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('testCaseSteps', () => {
    describe('api', () => {
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
