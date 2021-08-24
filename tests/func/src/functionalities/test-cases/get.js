const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')
const testsHelpers = require('../tests-helpers')

describe('TestCases', () => {
  describe('Get', () => {
    it('Get test case', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTreeRoot(userSession, project.id)
      const testCase = await apiHelpers.createTestCase(userSession, treeRoot.id)

      return req(config.backendUrl)
        .get(config.getApiV1Url('/test-cases/' + testCase.id))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send()
        .expect(200)
        .expect((res) => {
          const responseTestCase = res.body.data
          assert.deepStrictEqual(testCase, responseTestCase)
        })
    })
    it('Get test case - without authorization', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTreeRoot(userSession, project.id)
      const testCase = await apiHelpers.createTestCase(userSession, treeRoot.id)

      return testsHelpers.invalidAuthorizationTests(() => {
        return req(config.backendUrl)
          .get(config.getApiV1Url('/test-cases/' + testCase.id))
          .send()
      })
    })
  })
})
