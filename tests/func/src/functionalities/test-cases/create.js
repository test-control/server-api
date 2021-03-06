const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')

describe('TestCases', () => {
  describe('Create', () => {
    it('Create test case without description', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCaseTitle = 'Great test case'

      return req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases'))
        .send({
          treeId: treeRoot.id,
          title: testCaseTitle
        })
        .expect(201)
        .expect((res) => {
          const testCase = res.body.data
          assert.strictEqual(testCase.title, testCaseTitle)
          assert.strictEqual(testCase.treeId, treeRoot.id)
          assert.strictEqual(testCase.description, null)
        })
    })
    it('Create test case with description', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCaseTitle = 'Great test case'
      const testCaseDescription = '{}'

      return req(config.backendUrl)
        .post(config.getApiV1Url('/test-cases'))
        .send({
          treeId: treeRoot.id,
          title: testCaseTitle,
          description: testCaseDescription
        })
        .expect(201)
        .expect((res) => {
          const testCase = res.body.data
          assert.strictEqual(testCase.title, testCaseTitle)
          assert.strictEqual(testCase.treeId, treeRoot.id)
          assert.strictEqual(testCase.description, testCaseDescription)
        })
    })
    it('Create 20 test case at the same time', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCaseTitle = 'Great test case'

      const promises = []

      for (var i = 1; i <= 20; i++) {
        const fullTitle = testCaseTitle + i
        promises.push(req(config.backendUrl)
          .post(config.getApiV1Url('/test-cases'))
          .send({
            treeId: treeRoot.id,
            title: fullTitle
          })
          .expect(201)
          .expect((res) => {
            const testCase = res.body.data
            assert.strictEqual(testCase.title, fullTitle)
            assert.strictEqual(testCase.treeId, treeRoot.id)
          }))
      }

      return Promise.all(promises)
    })
  })
})
