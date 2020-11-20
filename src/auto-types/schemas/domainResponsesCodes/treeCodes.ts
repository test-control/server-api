/* tslint:disable */
export interface TreeCodes {
  errorCodes: ErrorCodes;
}

export const enum ErrorCodes {
  sameId = 'same-id',
  differentRoot = 'different-root',
  noEntity = 'no-entity'
}

