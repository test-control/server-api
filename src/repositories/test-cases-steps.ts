import Knex from 'knex'
import { Schemas } from '../auto-types'
import { TableNames } from '../database'
import { SimpleCrudRepository } from './common'
type CreateUpdatePayload = Omit<Schemas.Entities.TestCaseStepEntity, 'id'>;

export class TestCasesStepsRepository extends SimpleCrudRepository<Schemas.Entities.TestCaseStepEntity, CreateUpdatePayload> {
  constructor (knex: () => Knex) {
    super(knex, TableNames.TestCasesSteps)
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

  async findByTestCase (id: string, testCaseId: string) : Promise<Schemas.Entities.TestCaseStepEntity|undefined> {
    return this.store()
      .where('id', id)
      .where('test_case_id', testCaseId)
      .first()
  }

  async getByTestCase (testCaseId: string) : Promise<Schemas.Entities.TestCaseStepEntity[]> {
    return this.store()
      .select()
      .where('test_case_id', testCaseId)
  }

  async deleteById (id:string) {
    return this.store()
      .where('id', id)
      .delete()
  }
}
