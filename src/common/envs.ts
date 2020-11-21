import { validate } from 'jsonschema'
import { ServerCannotWork } from './errors'
import { Schemas } from '../auto-types'
import { safeLoad } from 'js-yaml'
import fs from 'fs'
import yn from 'yn'
import Dict = NodeJS.Dict;

let envs : Schemas.Envs
const schemaPropertiesIndex = 'properties'

const parseProperties = (object: object, schema: object) : object => {
  if (!schema) {
    return {}
  }

  const generatedObject = {}

  for (var key of Object.keys(schema)) {
    const objValue = schema[key]

    switch (objValue?.type) {
      case 'string':
        generatedObject[key] = object[key] || objValue.default
        break
      case 'boolean':
        generatedObject[key] = yn(object[key] || objValue.default)
        break
      case 'integer':
        generatedObject[key] = Number(object[key] || objValue.default)
        break
      case 'object':
        generatedObject[key] = parseProperties(object[key], objValue[schemaPropertiesIndex])
        break
    }
  }

  return generatedObject
}

export const setEnvs = (inputEnvs : Dict<string>, pathToSchema: string) => {
  const schemaObj = safeLoad(fs.readFileSync(pathToSchema, 'utf8'))
  if (typeof schemaObj !== 'object') {
    throw new ServerCannotWork(Schemas.ServerCannotWorkErrorCodes.missingEnv, 'Wrong environment schema format')
  }

  const tmpEnvs = parseProperties(inputEnvs, schemaObj[schemaPropertiesIndex])
  const validateResult = validate(tmpEnvs, schemaObj)

  if (!validateResult.valid) {
    throw new ServerCannotWork(Schemas.ServerCannotWorkErrorCodes.missingEnv, 'Missing environment settings', validateResult)
  }

  envs = tmpEnvs as Schemas.Envs
}

export const getEnvs = () : Schemas.Envs => {
  return envs
}
