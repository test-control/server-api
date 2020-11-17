import { testCasesRepository, testCasesStepsRepository } from '../../../../src/repositories'
import { Request, Response } from 'express'
import { createStepsApi } from '../../../../src/functionalities/testCaseSteps/api'
import { testCaseStepTransformer } from '../../../../src/entity-transformers'

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
  describe('testCaseSteps', () => {
    describe('createStepsApi', () => {
      it('Create row', async () => {
        const findByFunc = jest.fn(async () => {
          return {
            id: 'sample-1234'
          }
        }) as any

        testCasesRepository.bindFindById = jest.fn(() => {
          return findByFunc
        })

        testCasesStepsRepository.create = jest.fn((data: any) => {
          return {
            id: 'another-4567',
            title: data.title
          }
        }) as any

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        await createStepsApi(MockRequest, MockResponse)

        expect(findByFunc).toBeCalled()
        expect(findByFunc.mock.calls[0][0]).toEqual('sample-1234')
        expect(testCasesStepsRepository.create).toBeCalled()

        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          id: 'another-4567',
          title: 'sample title'
        })
      })
    })
  })
})
