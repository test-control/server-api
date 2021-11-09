import { OnSessionJWTValidation, OnSessionValidation } from './events'
import * as jwt from 'jsonwebtoken'
import { getEnvs } from '../../common/envs'
import { getSecretsPath, sendAppEvent } from '../../common'
import { readFileSync } from 'fs'
import { sessionsRepository } from '../../repositories'

export const onValidateSessionJWT = async (event:OnSessionJWTValidation) => {
  const jwt = event.jwt as any

  if (!jwt.jti) {
    throw new Error('Cannot find jti field')
  }

  const session = await sessionsRepository.findById(jwt.jti)

  if (!session) {
    throw new Error('Session not found')
  }
}

export const onValidateSession = async (event: OnSessionValidation) => {
  const authInfo = event.authInfo
  const request = event.request

  if (authInfo.type !== 'Bearer') {
    throw new Error('Invalid Authorization type')
  }

  const envs = getEnvs()
  const publicKeyPath = getSecretsPath() + envs.JWT_SIGN_KEY_PUBLIC_PATH
  const publicKey = readFileSync(publicKeyPath)

  const jwtBody = jwt.verify(authInfo.credentials, publicKey, {
    algorithms: envs.JWT_SIGN_KEY_ALGORITHM
  })

  await sendAppEvent(new OnSessionJWTValidation(
    event.authInfo,
    jwtBody
  ))

  request.accountContext = {
    accountId: jwtBody.accountId,
    sessionId: jwtBody.jti,
    jwt: jwtBody
  }
}
