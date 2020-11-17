import { Request, Response } from 'express'
import { testCasesStepsRepository } from '../../../../src/repositories'
import { listStepsApi } from '../../../../src/functionalities/testCaseSteps/api'

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
  describe('testCaseSteps', () => {
    describe('listStepsApi', () => {
      it('List entities', async () => {
        testCasesStepsRepository.getByTestCase = jest.fn(() => {
          return []
        }) as any

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await listStepsApi(
          MockRequest,
          MockResponse
        )

        expect(testCasesStepsRepository.getByTestCase).toBeCalled()
        expect(MockResponseSend).toBeCalled()
      })
    })
  })
})
