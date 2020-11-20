import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'

type CreateUpdatePayload = Pick<Schemas.Entities.TestCasePreconditionEntity, 'title' | 'display_after' | 'test_case_id'>;

export class TestCasesPreconditionsRepository extends SimpleCrudRepository<Schemas.Entities.TestCasePreconditionEntity, CreateUpdatePayload> {
  constructor (knex: Knex) {
    super(knex, TableNames.TestCasesPreconditions)
  }

  bindUpdateWithDisplayAfter () {
    return this.updateWithDisplayAfter.bind(this)
  }

  async updateWithDisplayAfter (id:string, data: CreateUpdatePayload & Schemas.Entities.DisplayOrderEntity) {
    if ('display_destination' in data) {
      await this.changeDisplayAfter(id, data.display_destination, data.display_move_direction)
      delete data.display_destination
      delete data.display_move_direction
    }

    if (Object.keys(data).length === 0) {
      return
    }

    return this.update(id, data)
  }

  async deleteById (id:string) {
    const row = await this.findById(id)

    if (!row) {
      return
    }

    await this.store()
      .where('display_after', row.id)
      .update({
        display_after: row.display_after || this.knex.raw('DEFAULT')
      })

    return super.deleteById(id)
  }

  async getByTestCase (testCaseId: string) {
    return this.store()
      .select()
      .where('test_case_id', testCaseId)
  }
}
