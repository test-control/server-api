import { snakeCase } from 'snake-case'

export const toSnakeCaseObject = <T>(obj:object) : T => {
  var newObject = {}

  for (var k in obj) {
    newObject[snakeCase(k)] = obj[k]
  }

  return newObject as T
}
