import { BeforeRegisterRoutes, BeforeStartApplication, sendAppEvent } from '../../common'
import { Strategy as LocalStrategy } from 'passport-local'
import { accountRepository, authMthUsernamePasswordRepository } from '../../repositories'
import passport from 'passport'
import { OnLoginAttempt } from './event'

export const beforeRegisterApplicationRoutes = (event: BeforeRegisterRoutes) => {
  event.app.use(passport.initialize())
}

export const beforeStartApplication = async (event: BeforeStartApplication) => {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      const authUser = await authMthUsernamePasswordRepository.findByUsername(username)

      const loginAttemptInfo = {
        username,
        password
      }

      if (!authUser) {
        await sendAppEvent(new OnLoginAttempt(
          false,
          loginAttemptInfo
        ))

        return done(null, false)
      }

      if (!await authMthUsernamePasswordRepository.comparePasswords(
        password,
        authUser
      )) {
        await sendAppEvent(new OnLoginAttempt(
          false,
          loginAttemptInfo,
          authUser,
          {
            reason: 'Invalid password'
          }
        ))

        return done(null, false)
      }

      await sendAppEvent(new OnLoginAttempt(
        true,
        loginAttemptInfo,
        authUser
      ))

      const account = await accountRepository.findById(authUser.accounts_id)

      return done(null, {
        account: account,
        user: authUser
      })
    }))
}
