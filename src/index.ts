
import { getEnvs } from './common/envs'

import functionalitiesConfig from './functionalities'
import { listenAppEvent } from './common'
import cors from 'cors'
import { errorHandlerMiddleware } from './middlewares/error-handler'
import path from 'path'
import { middleware } from 'express-openapi-validator'
import { setEnvsSettings } from './settings'

setEnvsSettings()

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error)
})

async function runServer () {
  const express = require('express')
  const app = express()
  const port = getEnvs().SERVER_PORT
  const funcConfig = functionalitiesConfig()

  app.use(cors({
    origin: getEnvs().CORS_ORIGIN
  }))

  app.use(express.json())

  app.use(middleware({
    apiSpec: path.join(__dirname, '..', 'specs', 'api', 'api.yaml'),
    validateRequests: true,
    validateResponses: false
  }))

  funcConfig.forEach((func) => {
    if (func.routes) {
      func.routes(app)
    }

    if (func.appEventsHandlers) {
      for (const eventName in func.appEventsHandlers) {
        for (const eventHandler of func.appEventsHandlers[eventName]) {
          listenAppEvent(eventName, eventHandler)
        }
      }
    }
  })

  app.use(errorHandlerMiddleware(getEnvs().APP_DEBUG))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

runServer().then()
