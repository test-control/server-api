import { getAppConnection } from '../database'
import { ProjectTreesRepository } from './project-trees'
import { ProjectsRepository } from './projects'
import { TestCasesRepository } from './test-cases'
import { TestCasesPreconditionsRepository } from './test-cases-preconditions'
import { TestCasesStepsRepository } from './test-cases-steps'
import { DATABASE_ENGINE } from '../auto-types/schemas'
import { TreesRepository } from './trees'
import { MysqlTreesRepository } from './mysql'
import { MssqlTreesRepository } from './mssql/trees'

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
export const testCasesRepository = new TestCasesRepository(getAppConnection)
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
