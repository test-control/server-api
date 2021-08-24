import { createUserConsole } from '../../src/functionalities/auth-username-password/commands'

export function seed (knex) {
  return createUserConsole({
    email: 'sample@test.com',
    password: 'samplePaSsword12345!C@.'
  })
}
