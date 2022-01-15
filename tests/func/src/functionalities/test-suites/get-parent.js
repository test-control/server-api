var config = require('../../config')
var assert = require('assert')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('TestSuite', () => {
  describe('get-parent api', () => {
    it('Use api without authorization', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(
        userSession,
        'TestSuite cget-parent api',
        'Very long description'
      )

      const testSuiteRoot = await apiHelpers.getProjectTestCaseRoot(
        userSession,
        project.id
      )

      return testsHelpers.invalidAuthorizationTests(() => {
        return req(config.backendUrl)
          .get(config.getApiV1Url('/test-suites/' + testSuiteRoot.id + '/get-parent'))
          .send()
      })
    })
    it('Find parent for root element', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(
        userSession,
        'TestSuite cget-parent api',
        'Very long description'
      )

      const testSuiteRoot = await apiHelpers.getProjectTestCaseRoot(
        userSession,
        project.id
      )

      return req(config.backendUrl)
        .get(config.getApiV1Url('/test-suites/' + testSuiteRoot.id + '/get-parent'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send()
        .expect(200)
        .expect((res) => {
          const responseTestSuite = res.body.data
          assert.strictEqual(testSuiteRoot.id, responseTestSuite.id)
        })
    })
    it('Find parent from child', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(
        userSession,
        'TestSuite cget-parent api',
        'Very long description'
      )

      const testSuiteRoot = await apiHelpers.getProjectTestCaseRoot(
        userSession,
        project.id
      )

      const childTestSuite = await apiHelpers.createTestSuite(
        userSession,
        testSuiteRoot.id,
        'Sample child'
      )

      return req(config.backendUrl)
        .get(config.getApiV1Url('/test-suites/' + childTestSuite.id + '/get-parent'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send()
        .expect(200)
        .expect((res) => {
          const responseTestSuite = res.body.data
          assert.strictEqual(testSuiteRoot.id, responseTestSuite.id)
        })
    })
  })
})
