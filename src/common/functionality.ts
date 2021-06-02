import { Router } from 'express'
import { IBaseEvent } from './app-events'

export interface IEventRow
{
  event: string|RegExp,
  listener: (event: IBaseEvent) => any
}

export interface ICommandOption
{
  name: string,
  alias?: string,
  describe?: string,
  type: 'boolean' | 'number' | 'string',
  demandOption?: boolean,
}

export interface IConsoleCommand
{
  name: string,
  description: string,
  options?: ICommandOption[],
  handler: (argv: any) => Promise<any>
}

export interface IFunctionality
{
  routes?: (router: Router) => any;
  appEventsHandlers?: Array<IEventRow>;
  commands?: Array<IConsoleCommand>;
}
