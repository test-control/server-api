import { NextFunction, Request, Response } from 'express'
import { InvalidSession } from '../error'
import { sendAppEvent } from '../../../common'
import { OnSessionValidation } from '../events'

export interface AuthInfo
{
  type: string;
  credentials: string;
}

const parseAuthorizationHeader = (authorization: string) : AuthInfo|null => {
  const authInfo = authorization.trim().split(/\s+/)

  if (authInfo.length < 2) {
    return null
  }

  return {
    type: authInfo[0],
    credentials: authInfo[1]
  }
}

export const validSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next(new InvalidSession({
      r: 'No authorization header'
    }))
  }

  const authorization = parseAuthorizationHeader(req.headers.authorization)

  if (!authorization) {
    next(new InvalidSession({
      r: 'Invalid authorization data format'
    }))
  }

  try {
    await sendAppEvent(new OnSessionValidation(
      authorization,
      req
    ))
  } catch (error) {
    next(new InvalidSession({
      r: 'Session validation error',
      err: error.toString()
    }))
  }

  next()
}
