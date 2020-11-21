import { getAppConnection } from '../database'
import { ProjectTreesRepository } from './project-trees'
import { ProjectsRepository } from './projects'
import { TestCasesRepository } from './test-cases'
import { TestCasesPreconditionsRepository } from './test-cases-preconditions'
import { TestCasesStepsRepository } from './test-cases-steps'
import { TreesRepository } from './trees'

export const projectsRepository = new ProjectsRepository(getAppConnection)
export const projectTreesRepository = new ProjectTreesRepository(getAppConnection)
export const testCasesRepository = new TestCasesRepository(getAppConnection)
export const testCasesPreconditionsRepository = new TestCasesPreconditionsRepository(getAppConnection)
export const testCasesStepsRepository = new TestCasesStepsRepository(getAppConnection)
export const treesRepository = new TreesRepository(getAppConnection)
