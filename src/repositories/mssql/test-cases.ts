import { TestCasesRepository } from '../test-cases'
import { getFullTableName } from '../../database'

export class MssqlTestCasesRepository extends TestCasesRepository {
  async changeDisplayOrder (fromId: string, toId: string) {
    const funcName = getFullTableName('test_cases_change_display_order')

    return this.knex().raw(`exec ${funcName} ?, ?`, [
      fromId,
      toId
    ])
  }
}
