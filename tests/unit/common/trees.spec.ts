import { extractRootFromPath, getAllLeavesFromRoot } from '../../../src/common/trees'

describe('common', () => {
  describe('trees', () => {
    describe('extractRootFromPath', () => {
      it('valid value', () => {
        const pairs = [
          {
            path: '11231231.1333',
            root: '11231231'
          },
          {
            path: '1',
            root: '1'
          }
        ]

        for (var pair of pairs) {
          expect(extractRootFromPath(pair.path)).toEqual(pair.root)
        }
      })
    })
    describe('createRootPath', () => {
      it('invalid value', () => {
        expect(getAllLeavesFromRoot('wqcff4tsrtaeg')).toBeNull()
        expect(getAllLeavesFromRoot('324.fwefef2')).toBeNull()
      })
      it('Valid value', () => {
        expect(getAllLeavesFromRoot('15.35.123.145.123')).toEqual([
          '15',
          '15.35',
          '15.35.123',
          '15.35.123.145',
          '15.35.123.145.123'
        ])
        expect(getAllLeavesFromRoot('15')).toEqual([
          '15'
        ])
        expect(getAllLeavesFromRoot('1')).toEqual([
          '1'
        ])
        expect(getAllLeavesFromRoot('1.35')).toEqual([
          '1',
          '1.35'
        ])
      })
    })
  })
})
