import * as path from 'path'

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
