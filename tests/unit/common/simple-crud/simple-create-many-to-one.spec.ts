import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
const MockTransformerCallback = jest.fn()
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')
let MockRelationFindCallback = jest.fn()
let MockCreateWithRelationCallback = jest.fn()
const nextFunction = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleCreateManyToOne', () => {
      it('Relation entity not found', async () => {
        await SimpleCrud.simpleCreateManyToOne({
          relationId: '134134',
          relationFindCallback: MockRelationFindCallback,
          createCallback: MockCreateWithRelationCallback,
          transformer: MockTransformerCallback,
          req: MockRequest,
          res: MockResponse
        })(MockRequest, MockResponse, nextFunction)

        expect(nextFunction).toBeCalled()
        expect(nextFunction.mock.calls[0][0].debug.relationId).toEqual('134134')
      })
      it('Entity created', async () => {
        MockRequest.body = {
          title: 'sample title'
        }

        MockRelationFindCallback = jest.fn(id => {
          return {
            id: id,
            title: 'sample'
          }
        })

        const MockTransformerCallback = jest.fn(obj => {
          return {
            subTitle: obj.title
          }
        })

        MockCreateWithRelationCallback = jest.fn(async (relationId, obj) : Promise<any> => {
          return {
            title: obj.title
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

        await SimpleCrud.simpleCreateManyToOne({
          relationId: '134134',
          relationFindCallback: MockRelationFindCallback,
          createCallback: MockCreateWithRelationCallback,
          transformer: MockTransformerCallback,
          req: MockRequest,
          res: MockResponse
        })(MockRequest, MockResponse)

        expect(nextFunction).not.toBeCalled()
        expect(MockRelationFindCallback).toBeCalled()
        expect(MockCreateWithRelationCallback).toBeCalled()
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
