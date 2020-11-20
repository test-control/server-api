import { Schemas } from '../auto-types'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Schemas.Envs{}
  }
}

export {}
