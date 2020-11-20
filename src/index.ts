import functionalitiesConfig from './functionalities'
import { OpenApiValidator } from 'express-openapi-validator/dist'
import { listenAppEvent, ServerCannotWork } from './common'
import cors from 'cors'
import { errorHandlerMiddleware } from './middlewares/error-handler'
import { safeLoad } from 'js-yaml'
import * as fs from 'fs'
import { validate } from 'jsonschema'
import { Schemas } from './auto-types'

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error)
})

async function runServer () {
  const express = require('express')
  const path = require('path')
  const app = express()
  const port = 3001
  const funcConfig = functionalitiesConfig()

  // Validate system environments
  const doc = safeLoad(fs.readFileSync(path.join(__dirname, '..', 'specs', 'envs.yaml'), 'utf8'))
  const validateResult = validate(process.env, doc)

  if (!validateResult.valid) {
    throw new ServerCannotWork(Schemas.ServerCannotWorkErrorCodes.missingEnv, 'Missing environment settings')
  }
  // end validate

  app.use(cors({
    origin: 'http://localhost:3000'
  }))

  app.use(express.json())

  const apiValidator = new OpenApiValidator({
    apiSpec: path.join(__dirname, '..', 'specs', 'api', 'api.yaml'),
    validateRequests: true,
    validateResponses: true
  })

  await apiValidator.install(app)

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

  app.use(errorHandlerMiddleware(process.env.APP_DEBUG))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

runServer().then()
