/* tslint:disable */
export interface ValidationError {
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
}

