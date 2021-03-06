import { Request, Response } from 'express'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
let MockFindEntityCallback = jest.fn()
const MockUpdateEntityCallback = jest.fn()
let MockTransformerCallback = jest.fn()
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')
const nextFunction = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleUpdate', () => {
      it('entityId not found in request', async () => {
        await SimpleCrud.simpleUpdate({
          findEntityCallback: MockFindEntityCallback,
          updateEntityCallback: MockUpdateEntityCallback,
          transformerCallback: MockTransformerCallback,
          entityName: 'sample'
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).toBeCalled()
        expect(nextFunction.mock.calls[0][0].debug.entityId).toBeUndefined()
      })
      it('Entity not found in store', async () => {
        MockRequest.params = {
          entityId: 'sample-id-1234'
        }

        await SimpleCrud.simpleUpdate({
          findEntityCallback: MockFindEntityCallback,
          updateEntityCallback: MockUpdateEntityCallback,
          transformerCallback: MockTransformerCallback,
          entityName: 'sample',
          req: MockRequest,
          res: MockResponse
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).toBeCalled()
        expect(nextFunction.mock.calls[0][0].debug.entityId).toEqual('sample-id-1234')
        expect(MockFindEntityCallback).toBeCalled()
      })
      it('Entity updated', async () => {
        MockRequest.params = {
          entityId: 'sample-id-1234'
        }

        MockRequest.body = {
          title: 'sampleTitle',
          anotherValue: 'anotherValue',
          yetAnotherValue: 'yetAnother value'
        }

        MockFindEntityCallback = jest.fn(entityId => {
          return {
            id: 'sample-id-1234'
          }
        })

        MockTransformerCallback = jest.fn(obj => {
          return {
            another: 'value',
            yeAnotherValue: 'yet-another-value'
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await SimpleCrud.simpleUpdate({
          findEntityCallback: MockFindEntityCallback,
          updateEntityCallback: MockUpdateEntityCallback,
          transformerCallback: MockTransformerCallback,
          entityName: 'sample',
          req: MockRequest,
          res: MockResponse
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).not.toBeCalled()
        expect(MockFindEntityCallback).toBeCalled()
        expect(MockFindEntityCallback.mock.calls[0][0]).toEqual('sample-id-1234')
        expect(MockFindEntityCallback.mock.calls[1][0]).toEqual('sample-id-1234')
        expect(MockUpdateEntityCallback.mock.calls[0][0]).toEqual('sample-id-1234')
        expect(MockUpdateEntityCallback.mock.calls[0][1]).toEqual({
          title: 'sampleTitle',
          another_value: 'anotherValue',
          yet_another_value: 'yetAnother value'
        })
        expect(MockTransformerCallback).toBeCalled()
        expect(MockResponse.send).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: {
            another: 'value',
            yeAnotherValue: 'yet-another-value'
          }
        })
      })
    })
  })
})
