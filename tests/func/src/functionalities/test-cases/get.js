const apiHelpers = require('../api-helpers')
const req = require('supertest')
const config = require('../../config')
const assert = require('assert')

describe('TestCases', () => {
  describe('Get', () => {
    it('Get test case', async () => {
      const project = await apiHelpers.createProject()
      const treeRoot = await apiHelpers.getProjectTreeRoot(project.id)
      const testCase = await apiHelpers.createTestCase(treeRoot.id)

      return req(config.backendUrl)
        .get(config.getApiV1Url('/test-cases/' + testCase.id))
        .send()
        .expect(200)
        .expect((res) => {
          const responseTestCase = res.body.data
          assert.deepStrictEqual(testCase, responseTestCase)
        })
    })
  })
})
