import testCaseFunc from '../../../../src/functionalities/trees'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes, testSimpleCrudRoutes } from '../api-common'
import { SimpleCrud } from '../../../../src/common'
import { createLeafApi, listLeavesApi } from '../../../../src/functionalities/trees/api'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('trees', () => {
    describe('api', () => {
      it('all pi', async () => {

      })
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
