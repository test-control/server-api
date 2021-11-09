
import { getEnvs } from './common/envs'
import functionalitiesConfig from './functionalities'
import { BeforeRegisterRoutes, BeforeStartApplication, listenAppEvent, sendAppEvent } from './common'
import cors from 'cors'
import {
  errorHandlerMiddleware,
  openApiErrorHandlerMiddleware
} from './middlewares/error-handler'
import path from 'path'
import { middleware } from 'express-openapi-validator'
import { setEnvsSettings } from './settings'

try {
  setEnvsSettings()
} catch (e) {
  console.log('Invalid environment settings: ' + JSON.stringify(e) + ' e: ' + e)
  process.exit(1)
}

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error)
})

async function runServer () {
  const express = require('express')
  const app = express()

  const port = getEnvs().SERVER_PORT
  const funcConfig = functionalitiesConfig()

  funcConfig.forEach((func) => {
    if (func.appEventsHandlers) {
      for (const event of func.appEventsHandlers) {
        listenAppEvent(event.event, event.listener)
      }
    }
  })
  app.use(cors({
    origin: getEnvs().CORS_ORIGIN
  }))

  app.use(express.json())

  try {
    await sendAppEvent(new BeforeRegisterRoutes(app))
  } catch (e) {
    console.error('Cannot run: BeforeRegisterRoutes: ', e)
    process.exit(1)
  }

  app.use(middleware({
    apiSpec: path.join(__dirname, '..', 'specs', 'api', 'api.yaml'),
    validateRequests: true,
    validateResponses: false
  }))

  app.use(openApiErrorHandlerMiddleware(getEnvs().APP_DEBUG))

  funcConfig.forEach((func) => {
    if (func.routes) {
      func.routes(app)
    }
  })

  app.use(errorHandlerMiddleware(getEnvs().APP_DEBUG))

  await sendAppEvent(new BeforeStartApplication(app))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

runServer().then()
