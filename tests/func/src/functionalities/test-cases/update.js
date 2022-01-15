const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')

describe('TestCase', () => {
  describe('Update', () => {
    it('Update test case title', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCase = await apiHelpers.createTestCase(userSession, treeRoot.id, 'Old title')

      const oldTestCase = await apiHelpers.getTestCase(userSession, testCase.id)
      assert.deepStrictEqual(testCase, oldTestCase)

      const newTestCaseTitle = 'newTitle'

      await req(config.backendUrl)
        .patch(config.getApiV1Url('/test-cases/' + testCase.id))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          title: newTestCaseTitle
        })
        .expect(200)

      const newTestCase = await apiHelpers.getTestCase(userSession, testCase.id)

      assert.strictEqual(newTestCaseTitle, newTestCase.title)
    })
    it('Update test case description', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCase = await apiHelpers.createTestCase(
        userSession,
        treeRoot.id,
        'Title',
        'Old description'
      )

      const oldTestCase = await apiHelpers.getTestCase(userSession, testCase.id)
      assert.deepStrictEqual(testCase, oldTestCase)

      const newTestCaseDescription = 'New description'

      await req(config.backendUrl)
        .patch(config.getApiV1Url('/test-cases/' + testCase.id))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          description: newTestCaseDescription
        })
        .expect(200)

      const newTestCase = await apiHelpers.getTestCase(userSession, testCase.id)

      assert.strictEqual(newTestCaseDescription, newTestCase.description)
    })
  })
})
