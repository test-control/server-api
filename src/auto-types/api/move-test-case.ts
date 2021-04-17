/* tslint:disable */
import { Request, Response } from 'express'

export namespace MoveTestCase{
  export interface ApplicationJsonRequestBody {
    displayAfter: string;
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
    [k: string]: unknown;
  }
  export type ResponseBody = ApplicationJson200ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
