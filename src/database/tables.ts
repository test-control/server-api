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
  Trees: getFullTableName('trees'),
  Projects: getFullTableName('projects'),
  ProjectTrees: getFullTableName('project_trees'),
  TestCases: getFullTableName('test_cases'),
  TestCasesPreconditions: getFullTableName('test_cases_preconditions'),
  TestCasesSteps: getFullTableName('test_cases_steps'),
  EntitiesHistory: getFullTableName('entities_history'),
  Accounts: getFullTableName('accounts')
}

export enum EntitiesNames {
  Project = 'project',
  TestCase = 'testCase',
  TestCasePrecondition = 'testCasePrecondition',
  TestCaseStep = 'testCaseStep',
  Tree = 'tree',
  EntitiesHistory = 'entitiesHistory',
  Account = 'account'
}
