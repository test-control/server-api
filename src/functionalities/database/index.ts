import { IConsoleCommand, IFunctionality } from '../../common'
import { dbSeedExample } from './commands'

var commands : Array<IConsoleCommand> = []

commands.push({
  name: 'db:seed:example',
  description: 'Seed database with example data',
  handler: dbSeedExample
})

export default function () : IFunctionality {
  return {
    commands: commands
  }
}
