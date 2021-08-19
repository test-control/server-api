import { InputValidationDataError } from '../common'

export const errorHandlerMiddleware = (debug?: boolean) => {
  return (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500

    if (debug) {
      console.log('errorHandlerMiddleware:')
      console.log(err)
    }

    res.status(statusCode).json({
      errors: err.errors,
      meta: {
        code: (err.code || err.statusCode || err.status || '').toString(),
        debug: (debug) ? {
          debug: JSON.stringify(err.debug),
          err: err.toString(),
          errObj: JSON.stringify(err)
        } : undefined
      }
    })
  }
}

export const openApiErrorHandlerMiddleware = (debug?: boolean) => {
  return (err, req, res, next) => {
    if (debug) {
      console.log('openApiErrorHandlerMiddleware:')
      console.log(err)
    }

    const errors = []

    for (var error of err.errors) {
      errors.push({
        path: error.path
      })
    }

    next(new InputValidationDataError(
      errors,
      {
        prevException: err
      }
    ))
  }
}
