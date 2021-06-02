#!/usr/bin/env node

import { setEnvsSettings } from './settings'
import functionalitiesConfig from './functionalities'
import yargs from 'yargs'

try {
  setEnvsSettings()
} catch (e) {
  console.log('Invalid environment settings: ' + JSON.stringify(e))
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

async function runConsole () {
  var console = yargs
    .scriptName('TestControl Console')
    .usage('$0 <cmd> [args]')

  const funcConfig = functionalitiesConfig()

  funcConfig.forEach((func) => {
    if (!func.commands) {
      return
    }

    for (var cmd of func.commands) {
      const commandConfig = cmd

      console.command(
        cmd.name,
        cmd.description,
        function (yargs) {
          var opt

          commandConfig.options.forEach((cmdOpt) => {
            var yrOpt = yargs

            if (opt) {
              yrOpt = opt
            }

            yrOpt.option(
              cmdOpt.name,
              {
                type: cmdOpt.type,
                alias: cmdOpt.alias,
                describe: cmdOpt.describe,
                demandOption: typeof cmdOpt.demandOption !== 'undefined' ? cmdOpt.demandOption : true
              }
            )
          })
        }
        ,
        async (argv) => {
          await commandConfig.handler(argv)
          process.exit()
        }
      )
    }
  })

  console
    .help()
    .argv
}

runConsole().then()
