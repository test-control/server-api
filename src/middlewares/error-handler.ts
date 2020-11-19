import { StatusCodes } from 'http-status-codes'

export const errorHandlerMiddleware = (debug?: boolean) => {
  return (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
      error: {
        code: err.code || err.statusCode,
        debug: (debug) ? {
          debug: err.debug,
          err: err
        } : undefined,
        message: (err.code || statusCode !== StatusCodes.INTERNAL_SERVER_ERROR) ? undefined : err.message
      }
    })
  }
}
