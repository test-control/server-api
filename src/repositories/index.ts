import { getAppConnection } from '../database'
import { ProjectTreesRepository } from './project-trees'
import { ProjectsRepository } from './projects'
import { TestCasesPreconditionsRepository } from './test-cases-preconditions'
import { TestCasesStepsRepository } from './test-cases-steps'
import { DATABASE_ENGINE } from '../auto-types/schemas'
import { TreesRepository } from './trees'
import { MysqlTreesRepository } from './mysql'
import { MssqlTreesRepository } from './mssql/trees'
import { TestCasesRepository } from './test-cases'
import { MssqlTestCasesRepository } from './mssql/test-cases'
import { EntitiesHistoryRepository } from './entities-history'
import { AuthMthUsernamePasswordRepository } from './auth-mth-username-password'
import { SessionsRepository } from './sessions'
import { AccountRepository } from './account'

interface InstantiateRepository<T>{
  isDefault?: boolean;
  engine: DATABASE_ENGINE;
  repository: () => T;
}
const instantiateRepository = <T>(vars: Array<InstantiateRepository<T>>) : T => {
  var defaultRepo

  for (var vRepo of vars) {
    if (vRepo.isDefault) {
      defaultRepo = vRepo
    }

    if (vRepo.engine === process.env.DATABASE_ENGINE) {
      return vRepo.repository()
    }
  }

  if (!defaultRepo) {
    throw new Error('Cannot find repository')
  }

  return defaultRepo.repository()
}

export const projectsRepository = new ProjectsRepository(getAppConnection)
export const projectTreesRepository = new ProjectTreesRepository(getAppConnection)
export const testCasesRepository = instantiateRepository([
  {
    isDefault: true,
    engine: DATABASE_ENGINE.postgresql,
    repository: () => new TestCasesRepository(getAppConnection)
  },
  {
    isDefault: false,
    engine: DATABASE_ENGINE.mssql,
    repository: () => new MssqlTestCasesRepository(getAppConnection)
  }
])
export const testCasesPreconditionsRepository = new TestCasesPreconditionsRepository(getAppConnection)
export const testCasesStepsRepository = new TestCasesStepsRepository(getAppConnection)
export const treesRepository = instantiateRepository([
  {
    isDefault: true,
    engine: DATABASE_ENGINE.postgresql,
    repository: () => new TreesRepository(getAppConnection)
  },
  {
    isDefault: false,
    engine: DATABASE_ENGINE.mysql,
    repository: () => new MysqlTreesRepository(getAppConnection)
  },
  {
    isDefault: false,
    engine: DATABASE_ENGINE.mssql,
    repository: () => new MssqlTreesRepository(getAppConnection)
  }
])

export const entitiesHistory = new EntitiesHistoryRepository(getAppConnection)
export const authMthUsernamePasswordRepository = new AuthMthUsernamePasswordRepository(getAppConnection)
export const accountRepository = new AccountRepository(getAppConnection)
export const sessionsRepository = new SessionsRepository(getAppConnection)
