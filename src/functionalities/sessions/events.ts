import { BaseEvent } from '../../common'
import { Schemas } from '../../auto-types'
import { AuthInfo } from './helpers/valid-session'
import { Request } from 'express'

export class OnSessionCreated extends BaseEvent {
  static readonly NAME = 'onSessionCreated'

  public constructor (
    public readonly account: Schemas.Entities.AccountEntity,
    public readonly session: Schemas.Entities.SessionEntity
  ) {
    super(OnSessionCreated.NAME)
  }
}

export class OnSessionValidation extends BaseEvent {
  static readonly NAME = 'onSessionValidation'

  public constructor (public authInfo: AuthInfo, public request: Request) {
    super(OnSessionValidation.NAME)
  }
}

export class OnSessionJWTValidation extends BaseEvent {
  static readonly NAME = 'onSessionJWTValidation'

  public constructor (public authInfo: AuthInfo, public jwt: object) {
    super(OnSessionJWTValidation.NAME)
  }
}
