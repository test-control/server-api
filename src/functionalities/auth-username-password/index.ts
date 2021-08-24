import { BeforeRegisterRoutes, BeforeStartApplication, IConsoleCommand, IFunctionality } from '../../common'
import { createUserConsole } from './commands'
import { Router } from 'express'
import { apiV1Route } from '../../common/routes'
import { signInApi } from './api'
import { beforeStartApplication, beforeRegisterApplicationRoutes } from './events-listeners'

const routes = (router: Router) => {
  router.post(
    apiV1Route('auth/u-p/sign-in'),
    signInApi
  )
}

var commands : Array<IConsoleCommand> = []

commands.push({
  name: 'user:create',
  description: 'Create user',
  handler: createUserConsole,
  options: [
    {
      name: 'email',
      type: 'string',
      alias: 'e'
    },
    {
      name: 'password',
      type: 'string',
      alias: 'p'
    }
  ]
})

const appEventsHandlers = [
  {
    event: BeforeStartApplication.NAME,
    listener: beforeStartApplication
  },
  {
    event: BeforeRegisterRoutes.NAME,
    listener: beforeRegisterApplicationRoutes
  }
]

export default function () : IFunctionality {
  return {
    routes: routes,
    commands: commands,
    appEventsHandlers: appEventsHandlers
  }
}
