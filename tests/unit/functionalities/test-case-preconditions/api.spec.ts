import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'
import iFunc from '../../../../src/functionalities/testCasePreconditions'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('testCasePreconditions', () => {
    describe('api', () => {
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
