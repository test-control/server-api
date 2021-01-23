var config = require('../../config')

const req = require('supertest')

describe('Get project', () => {
  it('Get project by id.', async () => {
    const title = 'Another project'
    const description = 'Another project description'

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    const projectId = response.body.data.id

    return req(config.backendUrl)
      .get(config.getApiV1Url('/projects/' + projectId))
      .expect(200, {
        data: {
          id: projectId,
          title: title,
          description: description
        }
      })
  })
})
