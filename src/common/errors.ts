import { StatusCodes } from 'http-status-codes'

export class BaseError extends Error {
  public debug;
  public code:number;

  constructor (code: number, debug?: object) {
    super()

    if (typeof code !== 'undefined') {
      this.code = code
    }

    if (typeof debug !== 'undefined') {
      this.debug = debug
    }
  }
}

export class InvalidInputData extends BaseError {
  constructor (debug?: object) {
    super(StatusCodes.NOT_FOUND, debug)
  }
}

export class ResourcesNotFound extends BaseError {
  constructor (debug?: object) {
    super(StatusCodes.NOT_FOUND, debug)
  }
}
