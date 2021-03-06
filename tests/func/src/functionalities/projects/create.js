var config = require('../../config')
var assert = require('assert')
var validator = require('validator')
var moment = require('moment')

const req = require('supertest')

describe('Creating project', () => {
  it('Create new project', () => {
    const description = 'Very long project description'
    const title = 'Sample great project'

    return req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
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
  it('Create 20 new project at the same time', async () => {
    const description = 'Very long project description'
    const title = 'Sample great project'

    const promises = []
    for (var i = 1; i <= 20; i++) {
      const fullTitle = title + i
      promises.push(req(config.backendUrl)
        .post(config.getApiV1Url('/projects'))
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
    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .send({
        title: 'Project with empty tree',
        description: 'Another project description with empty tree'
      })
      .expect(201)

    const project = response.body.data

    return req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + project.id + '/tree-root'))
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.data.title, 'root')
        assert.strictEqual(true, validator.isUUID(res.body.data.id, 4))

        const createdAt = moment(res.body.data.createdAt).format('YYYY-MM-DD hh:mm:ss')

        assert.strictEqual(res.body.data.createdAt, createdAt)
      })
  })
})
