export const errorHandlerMiddleware = (debug?: boolean) => {
  return (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500

    if (debug) {
      console.log(err)
    }

    res.status(statusCode).json({
      errors: err.errors,
      meta: {
        code: err.code || err.statusCode || err.status,
        debug: (debug) ? {
          debug: err.debug,
          err: err.toString(),
          errObj: JSON.stringify(err)
        } : undefined
      }
    })
  }
}
