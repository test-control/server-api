/* tslint:disable */
import { Request, Response } from 'express'

export namespace ListTestCasePreconditions{
  export interface PathRequestParams {
    testCaseId: string;
  }
  export interface QueryRequestParams {}
  export interface CookieRequestParams {}
  export interface HeaderRequestParams {}
  export type ApiRequest = Request<Required<PathRequestParams>, ResponseBody, {}, QueryRequestParams>
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
    }[];
  }
  export type ResponseBody = ApplicationJson200ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
