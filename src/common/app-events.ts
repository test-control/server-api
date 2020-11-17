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
    return entityName + '.created'
  }

  public static updatedEventName (entityName) {
    return entityName + '.updated'
  }

  public static deletedEventName (entityName) {
    return entityName + '.deleted'
  }
}

const appEventEmitter = new EventEmitter()

export const sendAppEvent = async <T extends IBaseEvent> (event: T) => {
  await appEventEmitter.emit(event.systemName, event)
}

export const listenAppEvent = (eventName: string, listener: (IBaseEvent) => any) => {
  appEventEmitter.addListener(eventName, listener)
}
