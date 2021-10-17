import { BaseEvent } from '../../common'
import { Schemas } from '../../auto-types'

export interface LoginAttemptInfo
{
  username: string,
  password: string
}

export interface DebugContextInfo
{
  reason: string
}

export class OnLoginAttempt extends BaseEvent {
  static readonly NAME = 'onLoginAttempt'

  public constructor (
    public success:boolean,
    public info: LoginAttemptInfo,
    public user?: Schemas.Entities.AuthMthUsernamePasswordEntity,
    public context?: DebugContextInfo
  ) {
    super(OnLoginAttempt.NAME)
  }
}
