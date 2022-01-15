import { DATABASE_ENGINE } from '../auto-types/schemas'

export const getFullTableName = (tableName: string, schemaName?: string) : string => {
  if (process.env.DATABASE_ENGINE === DATABASE_ENGINE.mysql) {
    return tableName
  }

  if (!schemaName) {
    schemaName = 'test_control'
  }

  return schemaName + '.' + tableName
}

export const TableNames = {
  TestSuites: getFullTableName('test_suites'),
  Projects: getFullTableName('projects'),
  ProjectTestSuites: getFullTableName('project_test_suites'),
  TestCases: getFullTableName('test_cases'),
  TestCasesPreconditions: getFullTableName('test_cases_preconditions'),
  TestCasesSteps: getFullTableName('test_cases_steps'),
  EntitiesHistory: getFullTableName('entities_history'),
  Accounts: getFullTableName('accounts'),
  AuthMthUsernamePassword: getFullTableName('auth_mth_username_password'),
  Sessions: getFullTableName('sessions')
}

export enum EntitiesNames {
  Project = 'project',
  TestCase = 'testCase',
  TestCasePrecondition = 'testCasePrecondition',
  TestCaseStep = 'testCaseStep',
  TestSuite = 'testSuite',
  EntitiesHistory = 'entitiesHistory',
  Account = 'account',
  AuthMthUsernamePassword = 'authMthUsernamePassword',
  Session = 'session'
}
