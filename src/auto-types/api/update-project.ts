/* tslint:disable */
import { Request, Response } from 'express'

export namespace UpdateProject{
  export interface ApplicationJsonRequestBody {
    /**
     * Title
     */
    title?: string;
    /**
     * Description
     */
    description?: string;
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
    data?: {};
  }
  export interface ApplicationJson400ResponseBody {
    errors: {
      /**
       * param path
       */
      path: string;
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
    } & {
      /**
       * blabla
       */
      code: string;
      [k: string]: unknown;
    };
  }
  export type ResponseBody = ApplicationJson200ResponseBody | ApplicationJson400ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
