const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')
const testsHelpers = require('../tests-helpers')

describe('TestCase', () => {
  describe('Order', () => {
    it('Check order', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)

      for (var i = 0; i < 20; i++) {
        const testCase = await apiHelpers.createTestCase(userSession, treeRoot.id)
        assert.strictEqual(testCase.displayOrder, i + 1)
      }
    })
    it('Move test case 1 -> 3', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCases = [
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[0].id + '/move'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          displayAfter: testCases[2].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(userSession, testCases[0].id),
        await apiHelpers.getTestCase(userSession, testCases[1].id),
        await apiHelpers.getTestCase(userSession, testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 1)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 2)
    })
    it('Move test case 3 -> 1', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCases = [
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[2].id + '/move'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          displayAfter: testCases[0].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(userSession, testCases[0].id),
        await apiHelpers.getTestCase(userSession, testCases[1].id),
        await apiHelpers.getTestCase(userSession, testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 2)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 1)
    })
    it('Move test case 2 -> 3', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCases = [
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[1].id + '/move'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          displayAfter: testCases[2].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(userSession, testCases[0].id),
        await apiHelpers.getTestCase(userSession, testCases[1].id),
        await apiHelpers.getTestCase(userSession, testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 1)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 2)
    })
    it('Move test case 1 -> 3 - without authorization', async () => {
      const userSession = await apiHelpers.auth.usernamePassword.signIn(
        config.users.defaultUser.email,
        config.users.defaultUser.password
      )

      const project = await apiHelpers.createProject(userSession)
      const treeRoot = await apiHelpers.getProjectTestCaseRoot(userSession, project.id)
      const testCases = [
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id),
        await apiHelpers.createTestCase(userSession, treeRoot.id)
      ]

      return testsHelpers.invalidAuthorizationTests(() => {
        return req(config.backendUrl)
          .post(config.getApiV1Url('/test-cases/' + testCases[0].id + '/move'))
          .send({
            displayAfter: testCases[2].id
          })
      })
    })
  })
})
