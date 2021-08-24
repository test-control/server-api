import { BaseError, InvalidInputData, ResourcesNotFound } from '../../../src/common'
import { StatusCodes } from 'http-status-codes'

const sampleErrorDebug = { test: 'object' }

describe('common', () => {
  describe('errors', () => {
    it('BaseError', () => {
      const error = new BaseError(500, 'sample-err', sampleErrorDebug)

      expect(error.statusCode).toEqual(500)
      expect(error.debug).toEqual(sampleErrorDebug)
      expect(error.code).toEqual('sample-err')
    })
    it('InvalidInputData', () => {
      const error = new InvalidInputData(sampleErrorDebug)
      expect(error.statusCode).toEqual(StatusCodes.BAD_REQUEST)
      expect(error.code).toEqual('invalid-input-data')
    })
    it('ResourceNotFound', () => {
      const error = new ResourcesNotFound(sampleErrorDebug)
      expect(error.statusCode).toEqual(StatusCodes.NOT_FOUND)
      expect(error.code).toEqual('resource-not-found')
    })
  })
})
