import { createLeafApi, listLeavesApi } from '../../../../src/functionalities/testSuites/api'
import { Request, Response } from 'express'
import { CreateCallback, TransformerCallback } from '../../../../src/common/simple-crud'
import { testSuitesRepository } from '../../../../src/repositories'
import { StatusCodes } from 'http-status-codes'

jest.mock('../../../../src/repositories')

const MockRequest = jest.genMockFromModule<Request>('express') as any
const MockResponse = jest.genMockFromModule<Response>('express') as any
const MockNextFunction = jest.fn()

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
  describe('test-suites', () => {
    describe('createLeafApi', () => {
      it('No parent entity', async () => {
        testSuitesRepository.findById = jest.fn(async (id: string) : Promise<any> => {
          expect(id).toEqual('sample-id1234')
        })

        expect.assertions(3)

        try {
          await createLeafApi(MockRequest, MockResponse, MockNextFunction)
        } catch (e) {
          expect(e.debug.relationId).toEqual('sample-id1234')
          expect(testSuitesRepository.findById).toBeCalled()
        }
      })
      it('Entry created', async () => {
        testSuitesRepository.findById = jest.fn(async (id: string) : Promise<any> => {
          expect(id).toEqual('sample-id1234')

          return {
            id: '123',
            tree_path: '345'
          }
        })

        testSuitesRepository.createLeaf = jest.fn(async (treePath: string, data:any) : Promise<any> => {
          const newEntity = {
            title: 'sample title'
          }

          expect(data).toEqual(newEntity)

          return {
            id: '4566',
            created_at: '2020-12-10 10:00:00',
            ...newEntity
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

        await createLeafApi(MockRequest, MockResponse, MockNextFunction)

        expect(testSuitesRepository.findById).toBeCalled()
        expect(testSuitesRepository.createLeaf).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: {
            id: '4566',
            title: 'sample title',
            createdAt: '2020-12-10 10:00:00'
          }
        })
        expect(MockResponseStatus).toBeCalled()
        expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      })
    })
  })
})
