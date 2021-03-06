const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')

describe('TestCases', () => {
  describe('Update', () => {
    it('Update test case title', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCase = await apiHelpers.createTestCase(treeRoot.id, 'Old title')

      const oldTestCase = await apiHelpers.getTestCase(testCase.id)
      assert.deepStrictEqual(testCase, oldTestCase)

      const newTestCaseTitle = 'newTitle'

      await req(config.backendUrl)
        .patch(config.getApiV1Url('/test-cases/' + testCase.id))
        .send({
          title: newTestCaseTitle
        })
        .expect(200)

      const newTestCase = await apiHelpers.getTestCase(testCase.id)

      assert.strictEqual(newTestCaseTitle, newTestCase.title)
    })
    it('Update test case description', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCase = await apiHelpers.createTestCase(
        treeRoot.id,
        'Title',
        'Old description'
      )

      const oldTestCase = await apiHelpers.getTestCase(testCase.id)
      assert.deepStrictEqual(testCase, oldTestCase)

      const newTestCaseDescription = 'New description'

      await req(config.backendUrl)
        .patch(config.getApiV1Url('/test-cases/' + testCase.id))
        .send({
          description: newTestCaseDescription
        })
        .expect(200)

      const newTestCase = await apiHelpers.getTestCase(testCase.id)

      assert.strictEqual(newTestCaseDescription, newTestCase.description)
    })
  })
})
