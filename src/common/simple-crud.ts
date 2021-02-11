import { NextFunction, Request, Response } from 'express'
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

export const simpleUpdate = (input : {
  findEntityCallback: FindEntityCallback,
  updateEntityCallback: UpdateEntityCallback,
  transformerCallback: TransformerCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const entityId = req.params.entityId

    if (!entityId) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    const entity = await input.findEntityCallback(entityId)

    if (!entity) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    await input.updateEntityCallback(entityId, toSnakeCaseObject(req.body))

    const updatedEntity = await input.findEntityCallback(entityId)

    await sendAppEvent(new EntityEvent(entity, EntityEvent.updatedEventName(input.entityName)))

    res.send({
      data: input.transformerCallback(updatedEntity)
    })
  }
}

export const simpleRunEUpdate = async (entityName: string, entities:object[]) => {
  const promises = []

  for (var e of entities) {
    const event = new EntityEvent(
      e,
      EntityEvent.updatedEventName(entityName)
    )

    promises.push(sendAppEvent(event))
  }

  return Promise.all(promises)
}

export const simpleGet = (input: {
  findEntityCallback: FindEntityCallback,
  transformerCallback: TransformerCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const entityId = req.params.entityId

    if (!entityId) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    const entity = await input.findEntityCallback(entityId)

    if (!entity) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    res.send({
      data: input.transformerCallback(entity)
    })
  }
}

export const simpleList = (input: {
  listCallback: ListCallback,
  transformerCallback: TransformerCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const objects = await input.listCallback()

    res.send({
      data: objects.map(pr => input.transformerCallback(pr))
    })
  }
}

export const simplePaginate = (input: {
  paginateCallback: PaginateCallback,
  transformerCallback: TransformerCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const perPage = Number(req.query.perPage) || 10
    const currentPage = Number(req.query.page) || 1

    if (!perPage || !currentPage) {
      return next(new InvalidInputData({
        perPage: req.query.perPage,
        currentPage: req.query.page,
        trace: 'Values must be an positive integer.'
      }))
    }

    const objects = await input.paginateCallback(currentPage, perPage)

    const response = {
      data: objects.data.map(pr => input.transformerCallback(pr))
    }

    res.send(paginationTransformer({
      total: objects.pagination.total,
      lastPage: objects.pagination.lastPage,
      perPage: objects.pagination.perPage,
      currentPage: objects.pagination.currentPage
    }, response))
  }
}

export const simpleDelete = (input :{
  findEntity: FindEntityCallback,
  deleteCallback: DeleteCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const entityId = req.params.entityId

    if (!entityId) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    const entity = await input.findEntity(entityId)

    if (!entity) {
      return next(new ResourcesNotFound({
        entityId: entityId
      }))
    }

    await input.deleteCallback(entityId)

    await sendAppEvent(new EntityEvent(entity, EntityEvent.deletedEventName(input.entityName)))

    res.send({})
  }
}

export const simpleCreate = (input:{
  createCallback: CreateCallback,
  transformer: TransformerCallback,
  entityName: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const entity = await input.createCallback(toSnakeCaseObject(req.body))

    await sendAppEvent(new EntityEvent(entity, EntityEvent.createdEventName(input.entityName)))

    res.status(StatusCodes.CREATED)
    res.send({
      data: input.transformer(entity)
    })
  }
}

export const simpleCreateManyToOne = (input:{
  createCallback: CreateWithRelationCallback,
  transformer: TransformerCallback,
  entityName: string,
  relationFindCallback: FindEntityCallback,
  relationId: string
}) => {
  return async (req:ApiRequest, res: Response, next: NextFunction) => {
    const relation = await input.relationFindCallback(input.relationId)

    if (!relation) {
      return next(new ResourcesNotFound({
        relationId: input.relationId
      }))
    }

    const entity = await input.createCallback(input.relationId, toSnakeCaseObject(req.body))

    await sendAppEvent(new EntityEvent(entity, EntityEvent.createdEventName(input.entityName)))

    res.status(StatusCodes.CREATED)
    res.send({
      data: input.transformer(entity)
    })
  }
}
