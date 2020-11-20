import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
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

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

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
          data: {
            subTitle: 'sample title'
          }
        })
        expect(MockResponseStatus).toBeCalled()
        expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      })
    })
  })
})
