import { StatusCodes } from 'http-status-codes'
import { Schemas } from '../auto-types'

export class BaseError extends Error {
  public debug;
  public code:string;
  public statusCode?: number;

  constructor (statusCode: number, code: string, debug?: object) {
    super()

    this.statusCode = statusCode
    this.code = code

    if (typeof debug !== 'undefined') {
      this.debug = debug
    }
  }
}

export class InvalidInputData extends BaseError {
  constructor (debug?: object, errCode?: string) {
    super(
      StatusCodes.NOT_FOUND,
      (errCode) || Schemas.CommonErrorCodes.invalidInputData,
      debug
    )
  }
}

export class ResourcesNotFound extends BaseError {
  constructor (debug?: object, errCode?: string) {
    super(
      StatusCodes.NOT_FOUND,
      (errCode) || Schemas.CommonErrorCodes.resourceNotFound,
      debug
    )
  }
}

export class ServerCannotWork extends Error {
  code: string;
  debug?: object;

  constructor (code, msg?: string, debug?: object) {
    super()

    this.code = code
    this.debug = debug
  }
}

export class DomainError extends BaseError {
  constructor (code: string, debug?: object, statusCode?: number) {
    super(statusCode || StatusCodes.BAD_REQUEST, code, debug)
  }
}
