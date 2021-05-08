import { IFunctionality } from '../../common'
import { onEntityCreated, onEntityUpdated, onEntityDeleted } from './events-listeners'

const appEventsHandlers = [
  {
    event: new RegExp(/^entity\.([a-zA-Z0-9-_]{1,})\.created$/),
    listener: onEntityCreated
  },
  {
    event: new RegExp(/^entity\.([a-zA-Z0-9-_]{1,})\.updated$/),
    listener: onEntityUpdated
  },
  {
    event: new RegExp(/^entity\.([a-zA-Z0-9-_]{1,})\.deleted$/),
    listener: onEntityDeleted
  }
]

export default function () : IFunctionality {
  return {
    appEventsHandlers: appEventsHandlers
  }
}
