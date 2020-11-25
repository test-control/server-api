import iFunc from '../../../../src/functionalities/projects'
import { apiV1Route } from '../../../../src/common/routes'
import { testRoutes } from '../api-common'
import { createProjectApi, listProjectsApi, updateProjectApi } from '../../../../src/functionalities/projects/api'

jest.mock('../../../../src/common/simple-crud', () => {
  return {
    simpleCreate: jest.fn(() => jest.fn())
  }
})

describe('functionalities', () => {
  describe('projects', () => {
    describe('api', () => {
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
