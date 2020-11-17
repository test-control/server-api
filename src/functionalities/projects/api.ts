import { projectsRepository, projectTreesRepository } from '../../repositories'
import { SimpleCrud } from '../../common'
import { CreateProject, ListProjects, ListProjectTree, UpdateProject } from '../../auto-types'
import { projectsTransformer } from '../../entity-transformers/project'
import { EntitiesNames } from '../../database'

export const createProjectApi = async (req:CreateProject.ApiRequest, res: CreateProject.ApiResponse) => {
  return SimpleCrud.simpleCreate({
    createCallback: projectsRepository.bindCreate(),
    transformer: projectsTransformer,
    entityName: EntitiesNames.Project,
    req,
    res
  })
}

export const listProjectsApi = async (req:ListProjects.ApiRequest, res: ListProjects.ApiResponse) => {
  return SimpleCrud.simplePaginate({
    paginateCallback: projectsRepository.bindPaginate(),
    entityName: EntitiesNames.Project,
    transformerCallback: projectsTransformer,
    req,
    res
  })
}

/**
 * remove it
 * @param req
 * @param res
 */
export const listProjectTree = async (req:ListProjectTree.ApiRequest, res: ListProjectTree.ApiResponse) => {
  const projectId = req.params.projectId

  const leafs = await projectTreesRepository.listProjectTree(projectId)

  res.send({
    data: leafs.map(pt => {
      return {
        parentId: pt.parent_id,
        id: pt.id,
        title: pt.title
      }
    })
  })
}

export const updateProjectApi = async (req:UpdateProject.ApiRequest, res: UpdateProject.ApiResponse) => {
  return SimpleCrud.simpleUpdate({
    findEntityCallback: projectsRepository.bindFindById(),
    updateEntityCallback: projectsRepository.bindUpdate(),
    entityName: EntitiesNames.Project,
    transformerCallback: projectsTransformer,
    req,
    res
  })
}
