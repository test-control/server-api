import { Router } from 'express'
import { IBaseEvent } from './app-events'

export interface IEventRow
{
  event: string|RegExp,
  listener: (event: IBaseEvent) => any
}

export interface IFunctionality
{
  routes?: (router: Router) => any;
  appEventsHandlers?: Array<IEventRow>;
}
