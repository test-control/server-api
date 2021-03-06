const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')

describe('TestCases', () => {
  describe('Order', () => {
    it('Check order', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)

      for (var i = 0; i < 20; i++) {
        const testCase = await apiHelpers.createTestCase(treeRoot.id)
        assert.strictEqual(testCase.displayOrder, i + 1)
      }
    })
    it('Move test case 1 -> 3', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCases = [
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[0].id + '/move'))
        .send({
          displayAfter: testCases[2].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(testCases[0].id),
        await apiHelpers.getTestCase(testCases[1].id),
        await apiHelpers.getTestCase(testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 1)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 2)
    })
    it('Move test case 3 -> 1', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCases = [
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[2].id + '/move'))
        .send({
          displayAfter: testCases[0].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(testCases[0].id),
        await apiHelpers.getTestCase(testCases[1].id),
        await apiHelpers.getTestCase(testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 2)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 1)
    })
    it('Move test case 2 -> 3', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCases = [
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id),
        await apiHelpers.createTestCase(treeRoot.id)
      ]

      await req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases/' + testCases[1].id + '/move'))
        .send({
          displayAfter: testCases[2].id
        })
        .expect(200)

      const newTestCasesOrder = [
        await apiHelpers.getTestCase(testCases[0].id),
        await apiHelpers.getTestCase(testCases[1].id),
        await apiHelpers.getTestCase(testCases[2].id)
      ]

      assert.strictEqual(newTestCasesOrder[0].displayOrder, 1)
      assert.strictEqual(newTestCasesOrder[1].displayOrder, 3)
      assert.strictEqual(newTestCasesOrder[2].displayOrder, 2)
    })
  })
})
