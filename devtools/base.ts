import * as path from 'path'
import { JSONSchema4 } from 'json-schema'
import camelcase from 'camelcase'

export const apiSpecPath = path.join(__dirname, '..', 'specs', 'api')
export const schemaSpecPath = path.join(__dirname, '..', 'specs', 'schemas')
export const autoTypesPath = path.join(__dirname, '..', 'src', 'auto-types')

export class SchemasContainer {
  private schemas : Record<string, Array<string>> = {};

  addSchema (schema:string, schemaSubPath:string) {
    if (!this.schemas[schemaSubPath]) {
      this.schemas[schemaSubPath] = []
    }

    this.schemas[schemaSubPath].push(schema)
  }

  getSchemas () {
    return this.schemas
  }
}

const tsEnumNameParam = 'tsEnumNames'
export const adjustJsonSchemaForCompiler = (obj: JSONSchema4) => {
  if (obj.enum) {
    obj[tsEnumNameParam] = []

    for (var enumVal of obj.enum) {
      obj[tsEnumNameParam].push(camelcase(enumVal as string))
    }
    return
  }

  if (!obj.properties) {
    return
  }

  for (var o of Object.values(obj.properties)) {
    adjustJsonSchemaForCompiler(o)
  }
}
