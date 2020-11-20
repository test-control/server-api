/* tslint:disable */
export interface ErrorCodes {
  serverCannotWorkErrorCodes: ServerCannotWorkErrorCodes;
  commonErrorCodes: CommonErrorCodes;
}

export const enum ServerCannotWorkErrorCodes {
  missingEnv = 'missing-env'
}
export const enum CommonErrorCodes {
  resourceNotFound = 'resource-not-found',
  invalidInputData = 'invalid-input-data'
}

