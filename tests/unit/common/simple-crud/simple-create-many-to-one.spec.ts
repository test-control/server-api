import { Request, Response } from 'express'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
const MockTransformerCallback = jest.fn()
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')
let MockRelationFindCallback = jest.fn()
let MockCreateWithRelationCallback = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simpleCreateManyToOne', () => {
      it('Relation entity not found', async () => {
        expect.assertions(1)

        try {
          await SimpleCrud.simpleCreateManyToOne({
            relationId: '134134',
            relationFindCallback: MockRelationFindCallback,
            createCallback: MockCreateWithRelationCallback,
            transformer: MockTransformerCallback,
            req: MockRequest,
            res: MockResponse
          })
        } catch (e) {
          expect(e.debug.relationId).toEqual('134134')
        }
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

        await SimpleCrud.simpleCreateManyToOne({
          relationId: '134134',
          relationFindCallback: MockRelationFindCallback,
          createCallback: MockCreateWithRelationCallback,
          transformer: MockTransformerCallback,
          req: MockRequest,
          res: MockResponse
        })

        expect(MockRelationFindCallback).toBeCalled()
        expect(MockCreateWithRelationCallback).toBeCalled()
        expect(MockTransformerCallback).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          subTitle: 'sample title'
        })
      })
    })
  })
})
