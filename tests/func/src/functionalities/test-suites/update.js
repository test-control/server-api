var config = require('../../config')
var assert = require('assert')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('TestSuite', () => {
  describe('Updating TestSuite', () => {
    it('Update TestSuite title', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession, 'Updating TestSuite - Update test suite title')
      const root = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const newTitle = 'New another title'
      const newTree = await apiHelpers.createTestSuite(userSession, root.id, 'Sample test suite')

      await req(config.backendUrl)
        .patch(config.getApiV1Url('/test-suites/' + newTree.id))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          title: newTitle
        })

      const updatedTree = await apiHelpers.getTestSuite(userSession, newTree.id)

      assert.strictEqual(updatedTree.title, newTitle)
    })
    it('Update TestSuite title - without authorization', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession, 'Updating TestSuite - Update test suite title')
      const root = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const newTitle = 'New another title'
      const newTree = await apiHelpers.createTestSuite(userSession, root.id, 'Sample test suite')

      return testsHelpers.invalidAuthorizationTests(() => {
        return req(config.backendUrl)
          .patch(config.getApiV1Url('/test-suites/' + newTree.id))
          .send({
            title: newTitle
          })
      })
    })
  })
})
