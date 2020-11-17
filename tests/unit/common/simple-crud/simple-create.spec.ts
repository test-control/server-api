import { Request, Response } from 'express'
const { SimpleCrud } = jest.requireActual('../../../../src/common')

const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleCreate', () => {
      it('Entity created', async () => {
        MockRequest.body = {
          title: 'sample title'
        }

        const MockTransformerCallback = jest.fn(obj => {
          return {
            subTitle: obj.title
          }
        })

        const MockCreateCallback = jest.fn(async (obj) : Promise<any> => {
          return {
            title: obj.title
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await SimpleCrud.simpleCreate({
          createCallback: MockCreateCallback,
          transformer: MockTransformerCallback,
          req: MockRequest,
          res: MockResponse,
          entityName: 'sampleEntity'
        })

        expect(MockCreateCallback).toBeCalled()
        expect(MockTransformerCallback).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          subTitle: 'sample title'
        })
      })
    })
  })
})
