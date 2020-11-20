import { createLeafApi, listLeavesApi } from '../../../../src/functionalities/trees/api'
import { Request, Response } from 'express'
import { CreateCallback, TransformerCallback } from '../../../../src/common/simple-crud'
import { treesRepository } from '../../../../src/repositories'
import { StatusCodes } from 'http-status-codes'

jest.mock('../../../../src/repositories')

const MockRequest = jest.genMockFromModule<Request>('express') as any
const MockResponse = jest.genMockFromModule<Response>('express') as any

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {
    entityId: 'sample-id1234'
  }

  MockRequest.body = {
    title: 'sample title'
  }
})

describe('functionalities', () => {
  describe('trees', () => {
    describe('createLeafApi', () => {
      it('No parent entity', async () => {
        treesRepository.findById = jest.fn(async (id: string) : Promise<any> => {
          expect(id).toEqual('sample-id1234')
        })

        expect.assertions(3)

        try {
          await createLeafApi(MockRequest, MockResponse)
        } catch (e) {
          expect(e.debug.relationId).toEqual('sample-id1234')
          expect(treesRepository.findById).toBeCalled()
        }
      })
      it('Entry created with parent non root entry', async () => {
        treesRepository.findById = jest.fn(async (id: string) : Promise<any> => {
          expect(id).toEqual('sample-id1234')

          return {
            id: '123',
            root_id: '345'
          }
        })

        treesRepository.create = jest.fn(async (data:any) : Promise<any> => {
          const newEntity = {
            parent_id: '123',
            root_id: '345',
            title: 'sample title'
          }

          expect(data).toEqual(newEntity)

          return {
            id: '4566',
            ...newEntity
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

        await createLeafApi(MockRequest, MockResponse)

        expect(treesRepository.findById).toBeCalled()
        expect(treesRepository.create).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: {
            id: '4566',
            parentId: '123',
            title: 'sample title'
          }
        })
        expect(MockResponseStatus).toBeCalled()
        expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      })
      it('Entry created with parent root entry', async () => {
        treesRepository.findById = jest.fn(async (id: string) : Promise<any> => {
          expect(id).toEqual('sample-id1234')

          return {
            id: '123',
            root_id: null
          }
        })

        treesRepository.create = jest.fn(async (data:any) : Promise<any> => {
          const newEntity = {
            parent_id: '123',
            root_id: '123',
            title: 'sample title'
          }

          expect(data).toEqual(newEntity)

          return {
            id: '4566',
            ...newEntity
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

        await createLeafApi(MockRequest, MockResponse)

        expect(treesRepository.findById).toBeCalled()
        expect(treesRepository.create).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: {
            id: '4566',
            parentId: '123',
            title: 'sample title'
          }
        })
        expect(MockResponseStatus).toBeCalled()
        expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      })
    })
  })
})
