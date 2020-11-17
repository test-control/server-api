import { appConnection } from '../database'
import { ProjectTreesRepository } from './project-trees'
import { ProjectsRepository } from './projects'
import { TestCasesRepository } from './test-cases'
import { TestCasesPreconditionsRepository } from './test-cases-preconditions'
import { TestCasesStepsRepository } from './test-cases-steps'
import { TreesRepository } from './trees'

export const projectsRepository = new ProjectsRepository(appConnection)
export const projectTreesRepository = new ProjectTreesRepository(appConnection)
export const testCasesRepository = new TestCasesRepository(appConnection)
export const testCasesPreconditionsRepository = new TestCasesPreconditionsRepository(appConnection)
export const testCasesStepsRepository = new TestCasesStepsRepository(appConnection)
export const treesRepository = new TreesRepository(appConnection)
