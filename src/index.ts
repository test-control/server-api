
import { getEnvs } from './common/envs'
import functionalitiesConfig from './functionalities'
import { listenAppEvent } from './common'
import cors from 'cors'
import { errorHandlerMiddleware } from './middlewares/error-handler'
import path from 'path'
import { middleware } from 'express-openapi-validator'
import { setEnvsSettings } from './settings'
import { getAppConnection } from './database'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

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

  /*
  app.use(middleware({
    apiSpec: path.join(__dirname, '..', 'specs', 'api', 'api.yaml'),
    validateRequests: true,
    validateResponses: false
  })) */

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

  app.get('/mega', async (req, res) => {
    const conn = getAppConnection()
    const treesId = uuid()

    const sql = 'INSERT INTO test_control.trees(id, title, tree_path, created_at)values(?, ?, test_control.trees_generate_new_path(\'1\'), ?)'

    await conn.transaction(async (trx) => {
      return trx
        .raw('SELECT TOP (1) 1 FROM test_control.trees WITH (TABLOCKX)')
        .then((rest) => {
          return trx.raw(sql, [
            treesId,
            'Sample' + treesId,
            moment().format('YYYY-MM-DD hh:mm:ss')
          ]).transacting(trx)
        })
    })

    res.send({ ok: 'yes' })
  })

  app.use(errorHandlerMiddleware(getEnvs().APP_DEBUG))

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

runServer().then()
