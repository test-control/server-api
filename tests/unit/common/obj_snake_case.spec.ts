import { toSnakeCaseObject } from '../../../src/common'

describe('common', () => {
  describe('obj_snake_case', () => {
    it('object transform', () => {
      const obj = {
        sampleKey: 'value',
        anotherKey: 'another-value',
        yetAnotherKey: 'yet-another-value'
      }

      expect(toSnakeCaseObject(obj)).toEqual({
        sample_key: 'value',
        another_key: 'another-value',
        yet_another_key: 'yet-another-value'
      })
    })
  })
})
