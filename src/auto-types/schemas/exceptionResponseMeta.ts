/* tslint:disable */
export interface ExceptionResponseMeta {
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
}

