import { Request, Response } from 'express'
import { testCasesPreconditionsRepository } from '../../../../src/repositories'
import { listPreconditionsApi } from '../../../../src/functionalities/testCasePreconditions/api'
const MockNextFunction = jest.fn()

jest.mock('../../../../src/repositories')

const MockRequest = jest.genMockFromModule<Request>('express') as any
const MockResponse = jest.genMockFromModule<Response>('express') as any

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {
    testCaseId: 'sample-1234'
  }
})

describe('functionalities', () => {
  describe('testCasePreconditions', () => {
    describe('createPreconditionsApi', () => {
      it('List entities', async () => {
        testCasesPreconditionsRepository.getByTestCase = jest.fn(() => {
          return []
        }) as any

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await listPreconditionsApi(
          MockRequest,
          MockResponse,
          MockNextFunction
        )

        expect(testCasesPreconditionsRepository.getByTestCase).toBeCalled()
        expect(MockResponseSend).toBeCalled()
      })
    })
  })
})
