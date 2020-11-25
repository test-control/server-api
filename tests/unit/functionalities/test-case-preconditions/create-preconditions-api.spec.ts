import {
  testCasesPreconditionsRepository, testCasesRepository
} from '../../../../src/repositories'
import { Request, Response } from 'express'
import { createPreconditionsApi } from '../../../../src/functionalities/testCasePreconditions/api'
import { StatusCodes } from 'http-status-codes'
const MockNextFunction = jest.fn()

jest.mock('../../../../src/repositories')

const MockRequest = jest.genMockFromModule<Request>('express') as any
const MockResponse = jest.genMockFromModule<Response>('express') as any

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {
    testCaseId: 'sample-1234'
  }

  MockRequest.body = {
    title: 'sample title'
  }
})

describe('functionalities', () => {
  describe('testCasePreconditions', () => {
    describe('createPreconditionsApi', () => {
      it('Create row', async () => {
        const findByFunc = jest.fn(async () => {
          return {
            id: 'sample-1234'
          }
        }) as any

        testCasesRepository.bindFindById = jest.fn(() => {
          return findByFunc
        })

        testCasesPreconditionsRepository.create = jest.fn((data: any) => {
          return {
            id: 'another-4567',
            title: data.title
          }
        }) as any

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockResponseStatus = jest.fn()
        MockResponse.status = MockResponseStatus

        await createPreconditionsApi(MockRequest, MockResponse, MockNextFunction)

        expect(findByFunc).toBeCalled()
        expect(findByFunc.mock.calls[0][0]).toEqual('sample-1234')
        expect(testCasesPreconditionsRepository.create).toBeCalled()

        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: {
            id: 'another-4567',
            title: 'sample title'
          }
        })
        expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      })
    })
  })
})
