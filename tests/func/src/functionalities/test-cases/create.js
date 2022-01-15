const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')
const testsHelpers = require('../tests-helpers')

describe('TestCase', () => {
  describe('Create', () => {
    it('Create test case without description', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const testSuiteIdRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCaseTitle = 'Great test case'

      return req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          testSuiteId: testSuiteIdRoot.id,
          title: testCaseTitle
        })
        .expect(201)
        .expect((res) => {
          const testCase = res.body.data
          assert.strictEqual(testCase.title, testCaseTitle)
          assert.strictEqual(testCase.testSuiteId, testSuiteIdRoot.id)
          assert.strictEqual(testCase.description, null)
        })
    })
    it('Create test case with description', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const testSuiteIdRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCaseTitle = 'Great test case'
      const testCaseDescription = '{}'

      return req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          testSuiteId: testSuiteIdRoot.id,
          title: testCaseTitle,
          description: testCaseDescription
        })
        .expect(201)
        .expect((res) => {
          const testCase = res.body.data
          assert.strictEqual(testCase.title, testCaseTitle)
          assert.strictEqual(testCase.testSuiteId, testSuiteIdRoot.id)
          assert.strictEqual(testCase.description, testCaseDescription)
        })
    })
    it('Create test case - without authorization', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const testSuiteIdRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCaseTitle = 'Great test case - without authorization'
      const testCaseDescription = '{}'

      return testsHelpers.invalidAuthorizationTests(() => {
        return req(config.backendUrl)
          .post(config.getApiV1Url('/test-cases'))
          .send({
            testSuiteId: testSuiteIdRoot.id,
            title: testCaseTitle,
            description: testCaseDescription
          })
      })
    })
    it('Create 20 test case at the same time', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const testSuiteIdRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCaseTitle = 'Great test case'

      const promises = []

      for (var i = 1; i <= 20; i++) {
        const fullTitle = testCaseTitle + i
        promises.push(req(config.backendUrl)
          .post(config.getApiV1Url('/test-cases'))
          .set(apiHelpers.getDefaultHeaders({
            Authorization: 'Bearer ' + userSession.token
          }))
          .send({
            testSuiteId: testSuiteIdRoot.id,
            title: fullTitle
          })
          .expect(201)
          .expect((res) => {
            const testCase = res.body.data
            assert.strictEqual(testCase.title, fullTitle)
            assert.strictEqual(testCase.testSuiteId, testSuiteIdRoot.id)
          }))
      }

      return Promise.all(promises)
    })
  })
})
