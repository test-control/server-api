import { IFunctionality, SimpleCrud } from '../../../src/common'
import { Request, Response, Router } from 'express'

export interface RequiredRoutes{
  m: string,
  r: string
}
export const testRoutes = (requiredRoutes:Array<RequiredRoutes>, func: IFunctionality) => {
  const mockRouter = jest.genMockFromModule<Router>('express')

  mockRouter.post = jest.fn()
  mockRouter.get = jest.fn()
  mockRouter.patch = jest.fn()
  mockRouter.delete = jest.fn()
  mockRouter.all = jest.fn()

  func.routes(mockRouter)

  for (const method of ['post', 'get', 'patch', 'delete']) {
    const methods = requiredRoutes.filter(row => row.m === method)

    expect(mockRouter[method].mock.calls.length).toEqual(methods.length)
  }
}
