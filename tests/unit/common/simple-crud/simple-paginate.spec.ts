import { Request, Response } from 'express'
import { IWithPagination } from 'knex-paginate'

const { SimpleCrud } = jest.requireActual('../../../../src/common')
const MockRequest = jest.genMockFromModule<Request>('express')
const MockResponse = jest.genMockFromModule<Response>('express')

beforeEach(() => {
  jest.clearAllMocks()

  MockRequest.params = {}
})

describe('common', () => {
  describe('simple-crud', () => {
    describe('simplePaginate', () => {
      it('Paginate rows', async () => {
        const MockTransformerCallback = jest.fn(obj => {
          return {
            id: obj.id,
            subTitle: obj.title
          }
        })

        const MockResponseSend = jest.fn()
        MockResponse.send = MockResponseSend

        const MockPaginateCallback = jest.fn(async (currentPage: number, perPage: number) : Promise<IWithPagination<any>> => {
          return {
            data: [
              {
                id: 12,
                title: 'sample'
              },
              {
                id: 124,
                title: 'another'
              }
            ],
            pagination: {
              currentPage: 1,
              lastPage: 2,
              perPage: 10,
              from: 1,
              to: 10,
              total: 20
            }
          }
        })

        await SimpleCrud.simplePaginate({
          paginateCallback: MockPaginateCallback,
          transformerCallback: MockTransformerCallback,
          entityName: 'sample',
          req: MockRequest,
          res: MockResponse
        })

        expect(MockPaginateCallback).toBeCalled()
        expect(MockResponseSend).toBeCalled()
        expect(MockResponseSend.mock.calls[0][0]).toEqual({
          data: [
            {
              id: 12,
              subTitle: 'sample'
            },
            {
              id: 124,
              subTitle: 'another'
            }
          ],
          meta: {
            currentPage: 1,
            lastPage: 2,
            perPage: 10,
            total: 20
          }
        })
      })
    })
  })
})
