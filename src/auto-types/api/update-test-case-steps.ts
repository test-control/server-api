/* tslint:disable */
import { Request, Response } from 'express'

export namespace UpdateTestCaseSteps{
  export interface ApplicationJsonRequestBody {
    /**
     * Title
     */
    title?: string;
    /**
     * Display destination uuid item
     */
    displayDestination?: string;
    displayMoveDirection?: DisplayMoveDirection;
  }

  /**
   * Displaying movement direction
   */
  export const enum DisplayMoveDirection {
    down = "down",
    up = "up"
  }
  export type RequestBody = ApplicationJsonRequestBody
  export interface PathRequestParams {
    entityId: string;
  }
  export interface QueryRequestParams {}
  export interface CookieRequestParams {}
  export interface HeaderRequestParams {}
  export type ApiRequest = Request<Required<PathRequestParams>, ResponseBody, RequestBody, QueryRequestParams>
  export interface ApplicationJson200ResponseBody {
    data: {
      /**
       * Unique id
       */
      id: string;
      /**
       * Title
       */
      title: string;
      /**
       * Test case uuid
       */
      testCaseId: string;
      /**
       * Display after uuid item
       */
      displayAfter?: string;
    };
  }
  export type ResponseBody = ApplicationJson200ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
