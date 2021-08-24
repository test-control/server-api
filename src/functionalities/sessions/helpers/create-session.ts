import { Schemas } from '../../../auto-types'
import { getSecretsPath, sendAppEvent } from '../../../common'
import { OnSessionCreated } from '../events'
import { sessionsRepository } from '../../../repositories'
import * as jwt from 'jsonwebtoken'
import { getEnvs } from '../../../common/envs'
import * as fs from 'fs'

export const createSession = async (account: Schemas.Entities.AccountEntity) : Promise<string> => {
  const session = await sessionsRepository.create({
    accounts_id: account.id
  })

  const envs = getEnvs()
  const privateKeyPath = getSecretsPath() + envs.JWT_SIGN_KEY_PRIVATE_PATH
  const privateKey = fs.readFileSync(privateKeyPath)

  const jwtToken = jwt.sign({
    accountId: account.id
  }, {
    key: privateKey,
    passphrase: envs.JWT_SIGN_KEY_PASSPHRASE
  }, {
    jwtid: session.id,
    algorithm: envs.JWT_SIGN_KEY_ALGORITHM
  })

  await sendAppEvent(new OnSessionCreated(
    account,
    session
  ))

  return jwtToken
}
