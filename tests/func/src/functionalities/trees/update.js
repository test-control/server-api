var config = require('../../config')
var assert = require('assert')
const apiHelpers = require('../api-helpers')
const req = require('supertest')
const testsHelpers = require('../tests-helpers')

describe('Updating Tree', () => {
  it('Update tree title', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const project = await apiHelpers.createProject(userSession, 'Updating Tree - Update tree title')
    const root = await apiHelpers.getTreeRoot(userSession, project.id)
    const newTitle = 'New another title'
    const newTree = await apiHelpers.createTree(userSession, root.id, 'Sample tree')

    await req(config.backendUrl)
      .patch(config.getApiV1Url('/trees/' + newTree.id))
      .set(apiHelpers.getDefaultHeaders({
        Authorization: 'Bearer ' + userSession.token
      }))
      .send({
        title: newTitle
      })

    const updatedTree = await apiHelpers.getTree(userSession, newTree.id)

    assert.strictEqual(updatedTree.title, newTitle)
  })
  it('Update tree title - without authorization', async () => {
    const userSession = await apiHelpers.auth.usernamePassword.signIn(
      config.users.defaultUser.email,
      config.users.defaultUser.password
    )

    const project = await apiHelpers.createProject(userSession, 'Updating Tree - Update tree title')
    const root = await apiHelpers.getTreeRoot(userSession, project.id)
    const newTitle = 'New another title'
    const newTree = await apiHelpers.createTree(userSession, root.id, 'Sample tree')

    return testsHelpers.invalidAuthorizationTests(() => {
      return req(config.backendUrl)
        .patch(config.getApiV1Url('/trees/' + newTree.id))
        .send({
          title: newTitle
        })
    })
  })
})
