/* tslint:disable */
import { Request, Response } from 'express'

export namespace CreateTestCase{
  export interface ApplicationJsonRequestBody {
    /**
     * Unique id
     */
    treeId: string;
    /**
     * Title
     */
    title: string;
    /**
     * Test case description
     */
    description?: string;
  }
  export type RequestBody = ApplicationJsonRequestBody
  export interface PathRequestParams {}
  export interface QueryRequestParams {}
  export interface CookieRequestParams {}
  export interface HeaderRequestParams {}
  export type ApiRequest = Request<Required<PathRequestParams>, ResponseBody, RequestBody, QueryRequestParams>
  export interface ApplicationJson201ResponseBody {
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
       * Test case description
       */
      description?: string;
      /**
       * Tree id
       */
      treeId: string;
      displayOrder: number;
    };
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
  export type ResponseBody = ApplicationJson201ResponseBody | ApplicationJson400ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
