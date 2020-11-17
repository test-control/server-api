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
    describe('simpleList', () => {
      it('List entities', async () => {
        const MockListCallback = jest.fn(async () : Promise<Array<object>> => {
          return [
            {
              id: 1235,
              title: 'sample'
            },
            {
              id: 1435,
              title: 'another'
            },
            {
              id: 6547,
              title: 'title'
            }
          ]
        })

        const MockTransformerCallback = jest.fn(obj => {
          return {
            id: obj.id,
            subTitle: obj.title
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await SimpleCrud.simpleList({
          listCallback: MockListCallback,
          transformerCallback: MockTransformerCallback,
          entityName: 'sample',
          req: MockRequest,
          res: MockResponse
        })

        expect(MockResponseSend).toBeCalled()
        expect(MockTransformerCallback).toBeCalled()
        expect(MockListCallback).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: [
            {
              id: 1235,
              subTitle: 'sample'
            },
            {
              id: 1435,
              subTitle: 'another'
            },
            {
              id: 6547,
              subTitle: 'title'
            }
          ]
        })
      })
    })
  })
})
