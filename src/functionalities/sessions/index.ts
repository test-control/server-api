import { IFunctionality } from '../../common'
import { OnSessionJWTValidation, OnSessionValidation } from './events'
import { onValidateSession, onValidateSessionJWT } from './events-listeners'

export * from './helpers'

const appEventsHandlers = [
  {
    event: OnSessionValidation.NAME,
    listener: onValidateSession
  },
  {
    event: OnSessionJWTValidation.NAME,
    listener: onValidateSessionJWT
  }
]

export default function () : IFunctionality {
  return {
    appEventsHandlers: appEventsHandlers
  }
}
