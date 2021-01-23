var config = require('../../config')

const req = require('supertest')

describe('Update project', () => {
  it('Update title', async () => {
    const title = 'Another project - updated title'
    const description = 'Another project description with updated title'

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    const projectId = response.body.data.id
    const newTitle = 'Another project - new updated title'

    return req(config.backendUrl)
      .patch(config.getApiV1Url('/projects/' + projectId))
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
    const title = 'Another project - updated description'
    const description = 'Another project description with updated description'

    const response = await req(config.backendUrl)
      .post(config.getApiV1Url('/projects'))
      .send({
        title: title,
        description: description
      })
      .expect(201)

    const projectId = response.body.data.id
    const newDescription = 'Another project - new updated description'

    return req(config.backendUrl)
      .patch(config.getApiV1Url('/projects/' + projectId))
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
})
