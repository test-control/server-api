module.exports = {
  backendUrl: 'http://backend:3000',
  getApiV1Url: (path) => {
    return '/api/v1' + path
  }
}
