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
    };
  }
  export type ResponseBody = ApplicationJson201ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
