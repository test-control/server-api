import { setEnvs } from './common/envs'
import { join } from 'path'

export const setEnvsSettings = () => {
  setEnvs(
    process.env,
    join(__dirname, '..', 'specs', 'schemas', 'envs.yaml')
  )
}
