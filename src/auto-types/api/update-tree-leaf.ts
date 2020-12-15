/* tslint:disable */
import { Request, Response } from 'express'

export namespace UpdateTreeLeaf{
  export interface ApplicationJsonRequestBody {
    /**
     * Title of root leaf
     */
    title: string;
    /**
     * Parent row id
     */
    parentId?: string;
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
       * Title of root leaf
       */
      title: string;
      createdAt: string;
    };
  }
  export interface ApplicationJson400ResponseBody {
    errors: {
      /**
       * Can be any value - string, number, boolean, array or object
       */
      value: {
        [k: string]: unknown;
      };
      /**
       * error code
       */
      msg: string;
      /**
       * param name
       */
      param: string;
      /**
       * param location
       */
      location: string;
    }[];
    meta?: {
      /**
       * Meta information about related exception
       */
      code: string;
      debug?: {
        /**
         * related debug context object
         */
        debug?: {
          [k: string]: unknown;
        };
        /**
         * related error string representation
         */
        err?: string;
        /**
         * Error object stringify
         */
        errObj?: string;
        [k: string]: unknown;
      };
    };
  }
  export type ResponseBody = ApplicationJson200ResponseBody | ApplicationJson400ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
