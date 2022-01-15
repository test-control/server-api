const config = require('../config')
const req = require('supertest')
const getDefaultHeaders = (headers) => {
  return {
    ...{
      'Content-Type': 'application/json'
    },
    ...headers
  }
}

module.exports = {
  getDefaultHeaders,
  createProject: async (userSession, title, description) => {
    if (typeof title === 'undefined') {
      title = 'Very long project description'
    }

    if (typeof description === 'undefined') {
      description = 'Sample great project'
    }

    const projectResponse = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    return projectResponse.body.data
  },
  getProjectTestCaseRoot: async (userSession, projectId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url(`/projects/${projectId}/test-suite-root`))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send()
      .expect(200)

    return response.body.data
  },
  createTestCase: async (userSession, testSuiteId, title, description) => {
    if (typeof title === 'undefined') {
      title = 'Great test case'
    }

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/test-cases'))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        testSuiteId: testSuiteId,
        title: title,
        description: description
      })
      .expect(201)

    return response.body.data
  },
  getTestCase: async (userSession, testCaseId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url('/test-cases/' + testCaseId))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send()
      .expect(200)

    return response.body.data
  },
  createTestSuite: async (userSession, parentTreeId, folderName) => {
    const treeRootResponse = await req(config.backendUrl)
      .post(config.getApiV1Url('/test-suites/' + parentTreeId))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: folderName
      })
      .expect(201)

    return treeRootResponse.body.data
  },
  getTestSuite: async (userSession, treeId) => {
    const response = await req(config.backendUrl)
      .get(config.getApiV1Url('/test-suites/' + treeId))
      .set(getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .expect(200)

    return response.body.data
  },
  auth: {
    usernamePassword: {
      signIn: async (username, password) => {
        const response = await req(config.backendUrl)
          .post(config.getApiV1Url('/auth/u-p/sign-in'))
          .set({
            'Content-Type': 'application/json'
          })
          .send({
            username,
            password
          })

        if (response.res.statusCode !== 200) {
          throw new Error('Cannot sign in: ' + response.res.text)
        }

        return response.body.data
      }
    }
  }
}
