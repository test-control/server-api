import { EventEmitter } from 'events'

export interface IBaseEvent
{
  systemName: string;
}

export interface IEventBaseEvent<T> extends IBaseEvent
{
  new (entity: T): IEventBaseEvent<T>
}

export abstract class BaseEvent implements IBaseEvent {
  eventDate = new Date()

  public constructor (public systemName) {}
}

export class EntityEvent<T> extends BaseEvent {
  readonly entity : T;

  public constructor (entity: T, eventName: string) {
    super(eventName)
    this.entity = entity
  }

  public static createdEventName (entityName) {
    return 'entity.' + entityName + '.created'
  }

  public static updatedEventName (entityName) {
    return 'entity.' + entityName + '.updated'
  }

  public static deletedEventName (entityName) {
    return 'entity.' + entityName + '.deleted'
  }
}

interface IEventMap{
  eventName: string|RegExp;
  listener: (IBaseEvent) => any
}

const appEventEmitter : Array<IEventMap> = []

export const sendAppEvent = async <T extends IBaseEvent> (event: T) => {
  for (var eventMap of appEventEmitter) {
    if (eventMap.eventName instanceof RegExp) {
      if (eventMap.eventName.exec(event.systemName) !== null) {
        await eventMap.listener(event)
      }

      continue
    }

    if (eventMap.eventName !== event.systemName) {
      continue
    }

    await eventMap.listener(event)
  }
}

export const listenAppEvent = (eventName: string|RegExp, listener: (IBaseEvent) => Promise<any>) => {
  appEventEmitter.push({
    eventName,
    listener
  })
}
