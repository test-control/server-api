/* tslint:disable */
export interface Common {
  errorCodes: {
    resourceNotFound?: ResourceNotFound;
    internalServerError?: InternalServerError;
    inputValidationError?: InputValidationError;
    [k: string]: unknown;
  };
}

export const enum ResourceNotFound {
  resourceNotFound = 'resource-not-found'
}
export const enum InternalServerError {
  internalServerError = 'internal-server-error'
}
export const enum InputValidationError {
  inputValidationError = 'input-validation-error'
}

