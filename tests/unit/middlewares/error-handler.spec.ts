import { errorHandlerMiddleware } from '../../../src/middlewares/error-handler'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'

class SampleError extends Error {
  statusCode?: number;
  debug?: object;
  code?: string;
}

const MockRequest = jest.genMockFromModule<Request>('express') as any
const MockResponse = jest.genMockFromModule<Response>('express') as any
const MockResponseStatus = jest.fn((code:any) => {
  return MockResponse
})
const MockResponseJson = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()

  MockResponse.status = MockResponseStatus
  MockResponse.json = MockResponseJson
})

describe('middlewares', () => {
  describe('error-handler', () => {
    it('Error response with only statusCode', () => {
      const err = new SampleError()
      err.statusCode = StatusCodes.CREATED

      const middleware = errorHandlerMiddleware()

      middleware(
        err,
        MockRequest,
        MockResponse,
        () => {}
      )

      expect(MockResponseJson).toBeCalled()
      expect(MockResponseStatus).toBeCalled()
      expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.CREATED)
      expect(MockResponseJson.mock.calls[0][0]).toEqual({
        error: {
          code: StatusCodes.CREATED,
          debug: undefined,
          message: undefined
        }
      })
    })
    it('Error response with statusCode and code', () => {
      const err = new SampleError()
      err.statusCode = StatusCodes.OK
      err.code = 'sample-code'

      const middleware = errorHandlerMiddleware()

      middleware(
        err,
        MockRequest,
        MockResponse,
        () => {}
      )

      expect(MockResponseJson).toBeCalled()
      expect(MockResponseStatus).toBeCalled()
      expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.OK)
      expect(MockResponseJson.mock.calls[0][0]).toEqual({
        error: {
          code: 'sample-code',
          debug: undefined,
          message: undefined
        }
      })
    })
    it('Error response with statusCode 500 and message', () => {
      const err = new SampleError()
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
      err.code = 'sample-code'
      err.message = 'sample low level logs from db. Oh no!'

      const middleware = errorHandlerMiddleware()

      middleware(
        err,
        MockRequest,
        MockResponse,
        () => {}
      )

      expect(MockResponseJson).toBeCalled()
      expect(MockResponseStatus).toBeCalled()
      expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(MockResponseJson.mock.calls[0][0]).toEqual({
        error: {
          code: 'sample-code',
          debug: undefined,
          message: undefined
        }
      })
    })
    it('Error response with debug enabled', () => {
      const err = new SampleError()
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
      err.code = 'sample-code'
      err.message = 'sample low level logs from db. Oh no!'
      err.debug = {
        sample: 'debug value',
        another: 'debug'
      }

      const middleware = errorHandlerMiddleware(true)

      middleware(
        err,
        MockRequest,
        MockResponse,
        () => {}
      )

      expect(MockResponseJson).toBeCalled()
      expect(MockResponseStatus).toBeCalled()
      expect(MockResponseStatus.mock.calls[0][0]).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(MockResponseJson.mock.calls[0][0]).toEqual({
        error: {
          code: 'sample-code',
          debug: {
            debug: {
              sample: 'debug value',
              another: 'debug'
            },
            err: err
          },
          message: undefined
        }
      })
    })
  })
})
