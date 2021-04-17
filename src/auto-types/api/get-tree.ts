/* tslint:disable */
import { Request, Response } from 'express'

export namespace GetTree{
  export interface PathRequestParams {
    entityId: string;
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
       * Title of root leaf
       */
      title: string;
      createdAt: string;
      /**
       * Elements amount
       */
      elementsAmount: number;
    };
  }
  export interface ApplicationJson404ResponseBody {
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
      code?: "resource-not-found";
      [k: string]: unknown;
    };
  }
  export type ResponseBody = ApplicationJson200ResponseBody | ApplicationJson404ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
