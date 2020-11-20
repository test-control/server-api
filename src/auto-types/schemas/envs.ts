/* tslint:disable */
/**
 * Schema for local environments object. Define all needed environment settings
 */
export interface Envs {
  /**
   * Determines if application should generate logs output(use only for debugging).
   */
  APP_DEBUG?: boolean;
  [k: string]: unknown;
}

