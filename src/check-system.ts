// Validate environment settings
import { getEnvs } from './common/envs'
import { setEnvsSettings } from './settings'

try {
  setEnvsSettings()
  getEnvs()
  console.log('Database engine: ' + getEnvs().DATABASE_ENGINE)
} catch (err) {
  console.log(JSON.stringify(err))
}
