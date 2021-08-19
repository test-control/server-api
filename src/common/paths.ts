export const getAppPath = () : string => {
  return __dirname + '/../../'
}

export const getSecretsPath = () : string => {
  return getAppPath() + 'secrets/'
}
