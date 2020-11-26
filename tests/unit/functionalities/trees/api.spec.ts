import testCaseFunc from '../../../../src/functionalities/trees'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'

describe('functionalities', () => {
  describe('trees', () => {
    describe('api', () => {
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('trees/:entityId')
          },
          {
            m: 'get',
            r: apiV1Route('trees/:entityId')
          },
          {
            m: 'patch',
            r: apiV1Route('trees/:entityId')
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
