/* tslint:disable */
export interface Common {
  errorCodes: {
    resourceNotFound?: ResourceNotFound;
    internalServerError?: InternalServerError;
    [k: string]: unknown;
  };
}

export const enum ResourceNotFound {
  resourceNotFound = 'resource-not-found'
}
export const enum InternalServerError {
  internalServerError = 'internal-server-error'
}

