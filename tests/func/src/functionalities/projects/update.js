var config = require('../../config')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('Update project', () => {
  it('Update title', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const title = 'Another project - updated title'
    const description = 'Another project description with updated title'

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
    const newTitle = 'Another project - new updated title'

    return req(config.backendUrl)
      .patch(config.getApiV1Url('/projects/' + projectId))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: newTitle
      })
      .expect(200, {
        data: {
          id: projectId,
          title: newTitle,
          description: description
        }
      })
  })
  it('Update description', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const title = 'Another project - updated description'
    const description = 'Another project description with updated description'

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
    const newDescription = 'Another project - new updated description'

    return req(config.backendUrl)
      .patch(config.getApiV1Url('/projects/' + projectId))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        description: newDescription
      })
      .expect(200, {
        data: {
          id: projectId,
          title: title,
          description: newDescription
        }
      })
  })
  it('Update title - without authorization', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const title = 'Another project - updated title without authorization'
    const description = 'Another project description with updated title without authorization'

    const project = await apiHelpers.createProject(
      userSession,
      title,
      description
    )

    const newTitle = 'Another project - new updated title'

    return testsHelpers.invalidAuthorizationTests(() => {
      return req(config.backendUrl)
        .patch(config.getApiV1Url('/projects/' + project.id))
        .send({
          title: newTitle
        })
    })
  })
})
