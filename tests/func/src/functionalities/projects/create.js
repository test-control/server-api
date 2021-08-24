var config = require('../../config')
var assert = require('assert')
var validator = require('validator')
var moment = require('moment')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('Creating project', () => {
  it('Create new project', async () => {
    const description = 'Very long project description'
    const title = 'Sample great project'

    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    return req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: title,
        description: description
      })
      .expect(201)
      .expect((res) => {
        assert.strictEqual(res.body.data.title, title)
        assert.strictEqual(res.body.data.description, description)
        assert.strictEqual(true, validator.isUUID(res.body.data.id, 4))
      })
  })
  it('Creat project - unauthorized request', async () => {
    return testsHelpers.invalidAuthorizationTests(() => {
      return req(config.backendUrl)
        .post(config.getApiV1Url('/projects'))
        .send({
          title: 'Sample title',
          description: 'Sample description'
        })
    })
  })
  it('Create 20 new project at the same time', async () => {
    const description = 'Very long project description'
    const title = 'Sample great project'

    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const promises = []
    for (var i = 1; i <= 20; i++) {
      const fullTitle = title + i
      promises.push(req(config.backendUrl)
        .post(config.getApiV1Url('/projects'))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          title: fullTitle,
          description: description
        })
        .expect(201)
        .expect((res) => {
          assert.strictEqual(res.body.data.title, fullTitle)
          assert.strictEqual(res.body.data.description, description)
          assert.strictEqual(true, validator.isUUID(res.body.data.id, 4))
        }))
    }

    return Promise.all(promises)
  })
  it('New project has tree root.', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: 'Project with empty tree',
        description: 'Another project description with empty tree'
      })
      .expect(201)

    const project = response.body.data

    return req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + project.id + '/tree-root'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.data.title, 'root')
        assert.strictEqual(true, validator.isUUID(res.body.data.id, 4))

        const createdAt = moment(res.body.data.createdAt).format('YYYY-MM-DD hh:mm:ss')

        assert.strictEqual(res.body.data.createdAt, createdAt)
      })
  })
})
