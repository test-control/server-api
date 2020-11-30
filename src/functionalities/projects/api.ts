import { projectsRepository, projectTreesRepository } from '../../repositories'
import { SimpleCrud } from '../../common'
import { Api } from '../../auto-types'
import { projectsTransformer } from '../../entity-transformers/project'
import { EntitiesNames } from '../../database'
import { NextFunction } from 'express'
import { treeTransformer } from '../../entity-transformers'

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

export const getProjectTreeRoot = async (
  req:Api.GetProjectTreeRoot.ApiRequest,
  res: Api.GetProjectTreeRoot.ApiResponse,
  next: NextFunction
) => {
  return SimpleCrud.simpleGet({
    findEntityCallback: projectTreesRepository.bindGetRoot(),
    transformerCallback: treeTransformer,
    entityName: EntitiesNames.Tree
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
