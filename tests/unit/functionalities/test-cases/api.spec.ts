
import testCaseFunc from '../../../../src/functionalities/test-cases'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'

describe('functionalities', () => {
  describe('test-cases', () => {
    describe('api', () => {
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
