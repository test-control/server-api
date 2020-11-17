import { apiV1Route } from '../../../src/common/routes'

describe('common', () => {
  describe('routes', () => {
    it('apiV1Route', () => {
      expect(apiV1Route('sample/route')).toEqual('/api/v1/sample/route')
    })
  })
})
