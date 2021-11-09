import projects from './projects'
import testCases from './test-cases'
import testCasePreconditions from './testCasePreconditions'
import testCaseSteps from './testCaseSteps'
import requirements from './requirements'
import trees from './trees'
import history from './history'
import authUsernamePassword from './auth-username-password'
import sessions from './sessions'
import database from './database'
import { IFunctionality } from '../common'

export default function () : Array<IFunctionality> {
  return [
    projects(),
    testCases(),
    testCasePreconditions(),
    testCaseSteps(),
    requirements(),
    trees(),
    history(),
    authUsernamePassword(),
    sessions(),
    database()
  ]
}
