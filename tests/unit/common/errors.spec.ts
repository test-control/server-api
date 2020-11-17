import { BaseError, InvalidInputData, ResourcesNotFound } from '../../../src/common'
import { StatusCodes } from 'http-status-codes'

const sampleErrorDebug = { test: 'object' }

describe('common', () => {
  describe('errors', () => {
    it('BaseError', () => {
      const error = new BaseError(500, sampleErrorDebug)

      expect(error.code).toEqual(500)
      expect(error.debug).toEqual(sampleErrorDebug)
    })
    it('InvalidInputData', () => {
      const error = new InvalidInputData(sampleErrorDebug)
      expect(error.code).toEqual(StatusCodes.NOT_FOUND)
    })
    it('ResourceNotFound', () => {
      const error = new ResourcesNotFound(sampleErrorDebug)
      expect(error.code).toEqual(StatusCodes.NOT_FOUND)
    })
  })
})
