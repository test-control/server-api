/* tslint:disable */
/**
 * Schema for local environments object. Define all needed environment settings
 */
export interface Envs {
  /**
   * Determines if application should generate logs output(use only for debugging).
   */
  APP_DEBUG?: boolean;
  /**
   * Express server api port
   */
  SERVER_PORT: number;
  /**
   * Connection string to PostgreSQL
   */
  POSTGRESQL_CONNECTION_STRING: string;
  /**
   * Cors origin setting
   */
  CORS_ORIGIN?: string;
}

