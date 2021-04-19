var config = require('../../config')
var assert = require('assert')
const apiHelpers = require('../api-helpers')
const req = require('supertest')

describe('Updating Tree', () => {
  it('Update tree title', async () => {
    const project = await apiHelpers.createProject('Updating Tree - Update tree title')
    const root = await apiHelpers.getTreeRoot(project.id)
    const newTitle = 'New another title'
    const newTree = await apiHelpers.createTree(root.id, 'Sample tree')

    await req(config.backendUrl)
      .patch(config.getApiV1Url('/trees/' + newTree.id))
      .send({
        title: newTitle
      })

    const updatedTree = await apiHelpers.getTree(newTree.id)

    assert.strictEqual(updatedTree.title, newTitle)
  })
})
