import { Express } from 'express'
import { AccountContext } from '../auto-types/schemas'

export interface IBaseEvent
{
  systemName: string;
}

export abstract class BaseEvent implements IBaseEvent {
  eventDate = new Date()

  public constructor (public systemName) {}
}

export class EntityEvent<T> extends BaseEvent {
  /**
   * Related entity.
   */
  readonly entity : T;

  /**
   * Account context which cause this event.
   * @private
   */
  private accountContext?:AccountContext;

  /**
   * Pattern used for matching type of current event.
   */
  readonly entityNamePattern = /^entity\.(?<entityName>[a-z-A-Z0-9-_]{1,})\.(?<action>created|updated|deleted)$/;

  public constructor (entity: T, eventName: string) {
    super(eventName)
    this.entity = entity
  }

  /**
   * Set account which cause this event.
   * @param ctx
   */
  public setAccountContext (ctx?:AccountContext) {
    this.accountContext = ctx
  }

  /**
   * Get entity system name.
   */
  public getEntityName () : string {
    var mtchs = this.systemName.match(this.entityNamePattern)

    if (mtchs == null) {
      throw new Error('invalid system name')
    }

    return mtchs.groups.entityName
  }

  /**
   * Get 'created entity' event's system name.
   * @param entityName
   */
  public static createdEventName (entityName:string) {
    return 'entity.' + entityName + '.created'
  }

  /**
   * Get 'updated entity' event's system name.
   * @param entityName
   */
  public static updatedEventName (entityName:string) {
    return 'entity.' + entityName + '.updated'
  }

  /**
   * Get 'deleted entity' event's system name.
   * @param entityName
   */
  public static deletedEventName (entityName:string) {
    return 'entity.' + entityName + '.deleted'
  }
}

export class EntityEventUpdated<T> extends EntityEvent<T> {
  readonly updatedFields : Partial<T>;

  public constructor (entity: T, updatedFields: Partial<T>, entityName: string) {
    super(entity, EntityEvent.updatedEventName(entityName))
    this.updatedFields = updatedFields
  }
}

export class BeforeStartApplication extends BaseEvent {
  static readonly NAME = 'beforeStartApplication';

  public constructor (public app: Express) {
    super(BeforeStartApplication.NAME)
  }
}

export class BeforeRegisterRoutes extends BaseEvent {
  static readonly NAME = 'beforeRegisterRoutes';

  public constructor (public app: Express) {
    super(BeforeRegisterRoutes.NAME)
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
