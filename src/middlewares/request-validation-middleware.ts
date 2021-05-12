import { validationResult } from 'express-validator'
import { InputValidationDataError } from '../common'
import { Schemas } from '../auto-types'

export const requestValidationMiddleware = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    const responseErrors : Schemas.ValidationError[] = []

    for (var error of errors.array()) {
      responseErrors.push({
        path: '.' + error.location + '.' + error.param
      })
    }

    next(new InputValidationDataError(
      responseErrors,
      {
        validationErrors: errors
      }
    ))
  }
}
