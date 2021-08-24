var config = require('../../config')
var assert = require('assert')
var validator = require('validator')
const apiHelpers = require('../api-helpers')
var moment = require('moment')
const testsHelpers = require('../tests-helpers')
const req = require('supertest')

describe('Creating Tree', () => {
  it('Create leaves - without authorization', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const project = await apiHelpers.createProject(
      userSession,
      'Tress create project - without authorization',
      'Very long description'
    )

    const treeRoot = await apiHelpers.getTreeRoot(
      userSession,
      project.id
    )

    return testsHelpers.invalidAuthorizationTests(() => {
      return req(config.backendUrl)
        .post(config.getApiV1Url('/trees/' + treeRoot.id))
        .send({
          title: 'No authorization'
        })
    })
  })
  it('Create 20 leaves at the same time', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const projectResponse = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: 'Very long project description',
        description: 'Sample great project'
      })
      .expect(201)

    const project = projectResponse.body.data

    const treeRootResponse = await req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + project.id + '/tree-root'))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .expect(200)
    const treeRoot = treeRootResponse.body.data
    const promises = []

    for (var i = 1; i <= 20; i++) {
      const folderName = 'Folder ' + i
      promises.push(req(config.backendUrl)
        .post(config.getApiV1Url('/trees/' + treeRoot.id))
        .set(apiHelpers.getDefaultHeaders({
          Authorization: 'Bearer ' + userSession.token
        }))
        .send({
          title: folderName
        })
        .expect(201)
        .expect((res) => {
          assert.strictEqual(true, validator.isUUID(res.body.data.id, 4))
          assert.strictEqual(folderName, res.body.data.title)

          const createdAt = moment(res.body.data.createdAt).format('YYYY-MM-DD hh:mm:ss')
          assert.strictEqual(res.body.data.createdAt, createdAt)
        }))
    }

    return Promise.all(promises)
  })
})
