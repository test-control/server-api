import { Api } from '../../auto-types'
import { NextFunction } from 'express'
import passport from 'passport'
import { InvalidInputData } from '../../common'
import { createSession } from '../sessions/helpers'

export const signInApi = async (
  req: Api.AuthUsernamePasswordSignin.ApiRequest,
  res,
  next: NextFunction
) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(new InvalidInputData({
        err: err.toString(),
        info: info
      }))
    }

    if (!user.user || !user.account) {
      return next(new InvalidInputData({
        info: info,
        user: user
      }))
    }

    let session = null

    try {
      session = await createSession(user.account)
    } catch (e) {
      return next(new InvalidInputData({
        info: info,
        user: user,
        e: JSON.stringify(e)
      }))
    }

    req.logIn(user.account, (err) => {
      if (err) {
        return next(new InvalidInputData({
          info: info,
          err: err.toString()
        }))
      }

      return res.send({
        data: {
          token: session
        }
      })
    })
  })(req, res, next)
}
