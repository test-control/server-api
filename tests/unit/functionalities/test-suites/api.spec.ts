import testCaseFunc from '../../../../src/functionalities/testSuites'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'

describe('functionalities', () => {
  describe('test-suites', () => {
    describe('api', () => {
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('test-suites/:entityId')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId')
          },
          {
            m: 'patch',
            r: apiV1Route('test-suites/:entityId')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId/leaves')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId/test-cases')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId/root-path')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId/get-project')
          },
          {
            m: 'get',
            r: apiV1Route('test-suites/:entityId/get-parent')
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
