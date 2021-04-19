const config = require('../config')
const req = require('supertest')

module.exports = {
  createProject: async (title, description) => {
    if (typeof title === 'undefined') {
      title = 'Very long project description'
    }

    if (typeof description === 'undefined') {
      description = 'Sample great project'
    }

    const projectResponse = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    return projectResponse.body.data
  },
  getProjectTreeRoot: async (projectId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url(`/projects/${projectId}/tree-root`))
      .send()
      .expect(200)

    return response.body.data
  },
  createTestCase: async (treeId, title, description) => {
    if (typeof title === 'undefined') {
      title = 'Great test case'
    }

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/test-cases'))
      .send({
        treeId: treeId,
        title: title,
        description: description
      })
      .expect(201)

    return response.body.data
  },
  getTestCase: async (testCaseId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url('/test-cases/' + testCaseId))
      .send()
      .expect(200)

    return response.body.data
  },
  createTree: async (parentTreeId, folderName) => {
    const treeRootResponse = await req(config.backendUrl)
      .post(config.getApiV1Url('/trees/' + parentTreeId))
      .send({
        title: folderName
      })
      .expect(201)

    return treeRootResponse.body.data
  },
  getTreeRoot: async (projectId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + projectId + '/tree-root'))
      .expect(200)

    return response.body.data
  },
  getTree: async (treeId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url('/trees/' + treeId))
      .expect(200)

    return response.body.data
  }
}
