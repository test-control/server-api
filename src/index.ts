import functionalitiesConfig from './functionalities'
import { OpenApiValidator } from 'express-openapi-validator/dist'
import { listenAppEvent } from './common'
import cors from 'cors'

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
  /* app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  }) */
  app.use(cors({
    origin: 'http://localhost:3000'
  }))
  app.use(express.json())

  const apiValidator = new OpenApiValidator({
    apiSpec: path.join(__dirname, '..', 'specs', 'api', 'api.yaml'),
    validateRequests: true
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

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

runServer().then()
