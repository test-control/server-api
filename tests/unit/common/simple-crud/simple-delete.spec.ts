import { Request, Response } from 'express'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
let MockFindEntityCallback = jest.fn()
const MockDeleteCallback = jest.fn()
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')
let nextFunction = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
  nextFunction = jest.fn()
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleDelete', () => {
      it('entityId not found in request', async () => {
        await SimpleCrud.simpleDelete({
          findEntity: MockFindEntityCallback,
          deleteCallback: MockDeleteCallback,
          entityName: 'sample'
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).toBeCalled()
        expect(nextFunction.mock.calls[0][0].debug.entityId).toBeUndefined()
      })
      it('Entity not found in store', async () => {
        MockRequest.params = {
          entityId: 'sample-id-1234'
        }

        await SimpleCrud.simpleDelete({
          findEntity: MockFindEntityCallback,
          deleteCallback: MockDeleteCallback,
          entityName: 'sample'
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).toBeCalled()
        expect(nextFunction.mock.calls[0][0].debug.entityId).toEqual('sample-id-1234')
        expect(MockFindEntityCallback).toBeCalled()
        expect(MockFindEntityCallback.mock.calls[0][0]).toEqual('sample-id-1234')
      })
      it('Entity deleted', async () => {
        MockRequest.params = {
          entityId: 'sample-id-1234'
        }
        MockFindEntityCallback = jest.fn(entityId => {
          return {
            id: 'sample-id-1234'
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await SimpleCrud.simpleDelete({
          findEntity: MockFindEntityCallback,
          deleteCallback: MockDeleteCallback,
          entityName: 'sample',
          req: MockRequest,
          res: MockResponse
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).not.toBeCalled()
        expect(MockFindEntityCallback).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockDeleteCallback).toBeCalled()
      })
    })
  })
})
