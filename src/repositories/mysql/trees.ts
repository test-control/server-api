import { CreateUpdatePayload, TreesRepository } from '../trees'
import { Schemas } from '../../auto-types'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { getFullTableName } from '../../database'

const CREATE_TREE_REC_ITERATIONS = 5

export class MysqlTreesRepository extends TreesRepository {
  createPrentSql (): string {
    const funcName = getFullTableName('trees_generate_root_new_path')
    return `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, ${funcName}(), ?) ON DUPLICATE KEY UPDATE tree_path=${funcName}()`
  }

  createLeafSql (parentPath) : string {
    const funcName = getFullTableName('trees_generate_new_path')
    return `INSERT INTO ${this.tableName}(id, title, tree_path, created_at)values(?, ?, ${funcName}('${parentPath}'),?) ON DUPLICATE KEY UPDATE tree_path=${funcName}('${parentPath}')`
  }

  async createParent (data: CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    return this.createParentRec(data, 1)
  }

  async createParentRec (data: CreateUpdatePayload, currIteration : number): Promise<Schemas.Entities.TreeEntity> {
    const treesId = uuid()

    await this.knex().raw(this.createPrentSql(), [
      treesId,
      data.title,
      moment(data.created_at).format('YYYY-MM-DD hh:mm:ss')
    ])

    const row = await this.store().where('id', treesId).first()

    if (!row && currIteration + 1 <= CREATE_TREE_REC_ITERATIONS) {
      return this.createParentRec(data, currIteration + 1)
    }

    return row
  }

  async createLeaf (parentPath: string, data:CreateUpdatePayload) : Promise<Schemas.Entities.TreeEntity> {
    return this.createLeafRec(parentPath, data, 1)
  }

  async createLeafRec (parentPath: string, data:CreateUpdatePayload, currIteration: number) : Promise<Schemas.Entities.TreeEntity> {
    const treesId = uuid()

    await this.knex().raw(this.createLeafSql(parentPath), [
      treesId,
      data.title,
      moment(data.created_at || new Date()).format('YYYY-MM-DD hh:mm:ss')
    ])

    var row = await this.store().where('id', treesId).first()

    if (!row && currIteration + 1 <= CREATE_TREE_REC_ITERATIONS) {
      return this.createParentRec(data, currIteration + 1)
    }

    return row
  }

  async paginateLeaves (parentId:string, currentPage: number, perPage: number) {
    const parent = await this.findById(parentId)
    const escapedTreePath = parent.tree_path.replace('.', '\\.')

    return this.store()
      .whereRaw(`tree_path REGEXP '^${escapedTreePath}\\.[0-9]{1,}$'`)
      .orderBy('tree_path', 'desc')
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
        isLengthAware: true
      })
  }
}
