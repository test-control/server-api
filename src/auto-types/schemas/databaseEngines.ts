/* tslint:disable */
export interface DatabaseEngines {
  types: Types;
}

export const enum Types {
  postgresql = 'postgresql',
  mysql = 'mysql',
  mssql = 'mssql'
}

