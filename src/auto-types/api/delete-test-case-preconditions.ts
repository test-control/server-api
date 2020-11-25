/* tslint:disable */
import { Request, Response } from 'express'

export namespace DeleteTestCasePreconditions{
  export interface PathRequestParams {}
  export interface QueryRequestParams {}
  export interface CookieRequestParams {}
  export interface HeaderRequestParams {}
  export type ApiRequest = Request<Required<PathRequestParams>, ResponseBody, {}, QueryRequestParams>
  export interface Empty200ResponseBody {}
  export type ResponseBody = Empty200ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
