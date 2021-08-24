var config = require('../../config')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('Get project', () => {
  it('Get project by id.', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const title = 'Another project'
    const description = 'Another project description'

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    const projectId = response.body.data.id

    return req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + projectId))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .expect(200, {
        data: {
          id: projectId,
          title: title,
          description: description
        }
      })
  })
  it('Get project by id - unauthorized request', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const title = 'Another project for unauthorized request'
    const description = 'Another project description for unauthorized request'

    const project = await apiHelpers.createProject(
      userSession,
      title,
      description
    )

    return testsHelpers.invalidAuthorizationTests(() => {
      return req(config.backendUrl)
        .get(config.getApiV1Url('/projects/' + project.id))
    })
  })
})
