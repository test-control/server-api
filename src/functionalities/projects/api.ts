import { projectsRepository, projectTestSuitesRepository } from '../../repositories'
import { SimpleCrud } from '../../common'
import { Api } from '../../auto-types'
import { projectsTransformer } from '../../entity-transformers/project'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'
import { testSuiteTransformer } from '../../entity-transformers'

export const createProjectApi = async (
  req:Api.CreateProject.ApiRequest,
  res: Api.CreateProject.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleCreate({
    createCallback: projectsRepository.bindCreate(),
    transformer: projectsTransformer,
    entityName: EntitiesNames.Project
  })(req, res, next)
}

export const listProjectsApi = async (
  req:Api.ListProjects.ApiRequest,
  res: Api.ListProjects.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simplePaginate({
    paginateCallback: projectsRepository.bindPaginate(),
    entityName: EntitiesNames.Project,
    transformerCallback: projectsTransformer
  })(req, res, next)
}

export const getProjectTestSuiteRoot = async (
  req:Api.GetProjectTestSuiteRoot.ApiRequest,
  res: Api.GetProjectTestSuiteRoot.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: projectTestSuitesRepository.bindGetRoot(),
    transformerCallback: testSuiteTransformer,
    entityName: EntitiesNames.TestSuite
  })(req, res, next)
}

export const updateProjectApi = async (
  req:Api.UpdateProject.ApiRequest,
  res: Api.UpdateProject.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: projectsRepository.bindFindById(),
    updateEntityCallback: projectsRepository.bindUpdate(),
    entityName: EntitiesNames.Project,
    transformerCallback: projectsTransformer
  })(req, res, next)
}

export const getProjectApi = async (
  req: Api.GetProject.ApiRequest,
  res: Api.GetProject.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: projectsRepository.bindFindById(),
    transformerCallback: projectsTransformer,
    entityName: EntitiesNames.Project
  })(req, res, next)
}
