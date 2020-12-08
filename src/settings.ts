import { setEnvs } from './common/envs'
import path from 'path'

export const setEnvsSettings = () => {
  setEnvs(
    process.env,
    path.join(__dirname, '..', 'specs', 'schemas', 'envs.yaml')
  )
}
