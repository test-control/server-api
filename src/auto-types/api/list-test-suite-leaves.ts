/* tslint:disable */
import { Request, Response } from 'express'

export namespace ListTestSuiteLeaves{
  export interface PathRequestParams {
    entityId: string;
  }
  export interface QueryRequestParams {
    page?: number;
    perPage?: number;
  }
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
       * path id
       */
      treePath: string;
      /**
       * Elements amount
       */
      elementsAmount: number;
      description?: string;
    }[];
    meta: {
      /**
       * Total amount of items
       */
      total: number;
      /**
       * Items amount per page
       */
      perPage: number;
      /**
       * Last page number
       */
      lastPage: number;
      /**
       * Current page number projects
       */
      currentPage: number;
    };
  }
  export type ResponseBody = ApplicationJson200ResponseBody
  export type ApiResponse = Response<ResponseBody>
}
