import { Request, Response } from 'express'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
let MockFindEntityCallback = jest.fn()
const MockDeleteCallback = jest.fn()
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleDelete', () => {
      it('entityId not found in request', async () => {
        expect.assertions(1)

        try {
          await SimpleCrud.simpleDelete({
            findEntity: MockFindEntityCallback,
            deleteCallback: MockDeleteCallback,
            entityName: 'sample',
            req: MockRequest,
            res: MockResponse
          })
        } catch (e) {
          expect(e.debug.entityId).toBeUndefined()
        }
      })
      it('Entity not found in store', async () => {
        expect.assertions(3)

        MockRequest.params = {
          entityId: 'sample-id-1234'
        }

        try {
          await SimpleCrud.simpleDelete({
            findEntity: MockFindEntityCallback,
            deleteCallback: MockDeleteCallback,
            entityName: 'sample',
            req: MockRequest,
            res: MockResponse
          })
        } catch (e) {
          expect(e.debug.entityId).toEqual('sample-id-1234')
          expect(MockFindEntityCallback).toBeCalled()
          expect(MockFindEntityCallback.mock.calls[0][0]).toEqual('sample-id-1234')
        }
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
        })

        expect(MockFindEntityCallback).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockDeleteCallback).toBeCalled()
      })
    })
  })
})
