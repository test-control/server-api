import iFunc from '../../../../src/functionalities/projects'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes, testSimpleCrudRoutes } from '../api-common'
import { createProjectApi, listProjectsApi, updateProjectApi } from '../../../../src/functionalities/projects/api'
jest.mock('../../../../src/common/simple-crud')

describe('functionalities', () => {
  describe('projects', () => {
    describe('api', () => {
      it('all pi', async () => {
        await testSimpleCrudRoutes([
          createProjectApi,
          listProjectsApi,
          updateProjectApi
        ])
      })
      it('Routes', () => {
        const requiredRoutes = [
          {
            m: 'post',
            r: apiV1Route('projects')
          },
          {
            m: 'get',
            r: apiV1Route('projects')
          },
          {
            m: 'get',
            r: apiV1Route('projects/:projectId/tree')
          },
          {
            m: 'patch',
            r: apiV1Route('projects/:projectId')
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
