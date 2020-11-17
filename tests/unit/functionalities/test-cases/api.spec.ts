
import { createTestCaseApi, getTestCaseApi, updateTestCaseApi } from '../../../../src/functionalities/test-cases/api'
import testCaseFunc from '../../../../src/functionalities/test-cases'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes, testSimpleCrudRoutes } from '../api-common'
import { SimpleCrud } from '../../../../src/common'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('test-cases', () => {
    describe('api', () => {
      it('all pi', async () => {
        await testSimpleCrudRoutes([
          createTestCaseApi,
          getTestCaseApi,
          updateTestCaseApi
        ])
      })
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('test-cases')
          },
          {
            m: 'get',
            r: apiV1Route('test-cases/:entityId')
          },
          {
            m: 'patch',
            r: apiV1Route('test-cases/:entityId')
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
