const apiHelpers = require('./api-helpers')

const invalidAuthorizationTests = async (requestCallback) => {
  var noAuthorizationHeader = requestCallback()
  await noAuthorizationHeader
    .set(apiHelpers.getDefaultHeaders({ }))
    .expect(401)

  var emptyAuthorizationHeader = requestCallback()
  await emptyAuthorizationHeader
    .set(apiHelpers.getDefaultHeaders({
      Authorization: ' '
    }))
    .expect(401)

  var emptyBearerToken = requestCallback()
  await emptyBearerToken
    .set(apiHelpers.getDefaultHeaders({
      Authorization: 'Bearer '
    }))
    .expect(401)

  var invalidBearerToken = requestCallback()
  await invalidBearerToken
    .set(apiHelpers.getDefaultHeaders({
      Authorization: 'Bearer sampleInvalidVeryLongToken'
    }))
    .expect(401)
}

module.exports = {
  invalidAuthorizationTests
}
