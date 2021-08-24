/* tslint:disable */
export interface AccountContext {
  /**
   * Account id
   */
  accountId?: string;
  /**
   * Session id
   */
  sessionId?: string;
  /**
   * Decoded JWT body
   */
  jwt?: {
    [k: string]: unknown;
  };
}

