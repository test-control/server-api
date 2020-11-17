export * from './connections'

export enum TableNames {
  Trees = 'trees',
  Projects = 'projects',
  ProjectTrees = 'project_trees',
  TestCases = 'test_cases',
  TestCasesPreconditions = 'test_cases_preconditions',
  TestCasesSteps = 'test_cases_steps'
}

export enum EntitiesNames {
  Project = 'project',
  TestCase = 'testCase',
  TestCasePrecondition = 'testCasePrecondition',
  TestCaseStep = 'testCaseStep',
  Tree = 'tree'
}
