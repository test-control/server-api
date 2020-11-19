import { Request, Response } from 'express'
import { paginationTransformer } from './transformers/pagination'
import { InvalidInputData, ResourcesNotFound } from './errors'
import { toSnakeCaseObject } from './obj_snake_case'
import { BaseEvent, EntityEvent, sendAppEvent } from './app-events'
import { StatusCodes } from 'http-status-codes'

interface IPaginateParams {
  perPage: number,
  currentPage: number,
  isFromStart?: boolean,
  isLengthAware?: boolean,
}

interface IWithPagination<T = any> {
  data: T;
  pagination: IPagination;
}

interface IPagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}

export interface ISimpleCrudRepository<EntityType, CreateUpdatePayload> {
  create(data: CreateUpdatePayload) : Promise<EntityType>;
}

export type TransformerCallback = (data:object) => object;
export type PaginateCallback = (currentPage: number, perPage: number) => Promise<IWithPagination<any>>;
export type UpdateCallback = (id: any, data: object) => any;
export type DeleteCallback = (id: any) => any;
export type ListCallback = () => Promise<Array<object>>;
type ApiRequest = Request<any, any, any, any>;
export type FindEntityCallback = (id: any) => any;
export type UpdateEntityCallback = (id: any, data:object) => any;
export type CreateCallback = (data: object) => any;
export type CreateWithRelationCallback = (relationId: string, data: object) => Promise<object>;

export const simpleUpdate = async (input : {
  findEntityCallback: FindEntityCallback,
  updateEntityCallback: UpdateEntityCallback,
  transformerCallback: TransformerCallback,
  entityName: string,
  req:ApiRequest,
  res: Response
}) => {
  const entityId = input.req.params.entityId

  if (!entityId) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  const entity = await input.findEntityCallback(entityId)

  if (!entity) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  await input.updateEntityCallback(entityId, toSnakeCaseObject(input.req.body))

  const updatedEntity = await input.findEntityCallback(entityId)

  input.res.send({
    data: input.transformerCallback(updatedEntity)
  })

  await sendAppEvent(new EntityEvent(entity, EntityEvent.updatedEventName(input.entityName)))
}

export const simpleGet = async (input: {
  findEntityCallback: FindEntityCallback,
  transformerCallback: TransformerCallback,
  entityName: string,
  req:ApiRequest,
  res: Response
}) => {
  const entityId = input.req.params.entityId

  if (!entityId) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  const entity = await input.findEntityCallback(entityId)

  if (!entity) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  input.res.send({
    data: input.transformerCallback(entity)
  })
}

export const simpleList = async (input: {
  listCallback: ListCallback,
  transformerCallback: TransformerCallback,
  entityName: string,
  req: ApiRequest,
  res: Response
}) => {
  const objects = await input.listCallback()

  input.res.send({
    data: objects.map(pr => input.transformerCallback(pr))
  })
}

export const simplePaginate = async (input: {
  paginateCallback: PaginateCallback,
  transformerCallback: TransformerCallback,
  entityName: string,
  req:ApiRequest,
  res: Response
}) => {
  const perPage = Number(input.req.query.perPage) || 10
  const currentPage = Number(input.req.query.page) || 1

  if (!perPage || !currentPage) {
    throw new InvalidInputData({
      perPage: input.req.query.perPage,
      currentPage: input.req.query.page,
      trace: 'Values must be an positive integer.'
    })
  }

  const objects = await input.paginateCallback(currentPage, perPage)

  const response = {
    data: objects.data.map(pr => input.transformerCallback(pr))
  }

  input.res.send(paginationTransformer({
    total: objects.pagination.total,
    lastPage: objects.pagination.lastPage,
    perPage: objects.pagination.perPage,
    currentPage: objects.pagination.currentPage
  }, response))
}

export const simpleDelete = async (input :{
  findEntity: FindEntityCallback,
  deleteCallback: DeleteCallback,
  entityName: string,
  req:ApiRequest,
  res: Response
}) => {
  const entityId = input.req.params.entityId

  if (!entityId) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  const entity = await input.findEntity(entityId)

  if (!entity) {
    throw new ResourcesNotFound({
      entityId: entityId
    })
  }

  await input.deleteCallback(entityId)

  input.res.send({})

  await sendAppEvent(new EntityEvent(entity, EntityEvent.deletedEventName(input.entityName)))
}

export const simpleCreate = async (input:{
  createCallback: CreateCallback,
  transformer: TransformerCallback,
  req: ApiRequest,
  res: Response,
  entityName: string
}) => {
  const entity = await input.createCallback(toSnakeCaseObject(input.req.body))

  input.res.status(StatusCodes.CREATED)
  input.res.send({
    data: input.transformer(entity)
  })

  await sendAppEvent(new EntityEvent(entity, EntityEvent.createdEventName(input.entityName)))
}

export const simpleCreateManyToOne = async (input:{
  createCallback: CreateWithRelationCallback,
  transformer: TransformerCallback,
  req: ApiRequest,
  res: Response,
  entityName: string,
  relationFindCallback: FindEntityCallback,
  relationId: string
}) => {
  const relation = await input.relationFindCallback(input.relationId)

  if (!relation) {
    throw new ResourcesNotFound({
      relationId: input.relationId
    })
  }

  const entity = await input.createCallback(input.relationId, toSnakeCaseObject(input.req.body))

  input.res.send(input.transformer(entity))

  await sendAppEvent(new EntityEvent(entity, EntityEvent.createdEventName(input.entityName)))
}
