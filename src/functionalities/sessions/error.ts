import { BaseError } from '../../common'
import { StatusCodes } from 'http-status-codes'
import { Schemas } from '../../auto-types'

export class InvalidSession extends BaseError {
  constructor (debug?: object, errCode?: string) {
    super(
      StatusCodes.UNAUTHORIZED,
      (errCode) || Schemas.CommonErrorCodes.invalidInputData,
      debug
    )
  }
}
