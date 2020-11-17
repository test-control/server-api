import { Router } from 'express'
import { IBaseEvent } from './app-events'

export interface IFunctionality
{
  routes?: (router: Router) => any;
  appEventsHandlers?: { [key:string]: Array<(event: IBaseEvent) => any>}
}
