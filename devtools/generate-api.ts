import * as devTools from './base'
import { adjustJsonSchemaForCompiler, SchemasContainer, schemaSpecPath } from './base'
const indentString = require('indent-string')

var jsonSchema = require('json-schema-to-typescript')
var $RefParser = require('@apidevtools/json-schema-ref-parser')
var glob = require('glob')
var camelCase = require('camelcase')
const fs = require('fs')
const path = require('path')

function translateSpecialChars (chars:string) {
  const specialFormat = /[^\w\s]/gi
  let newChars = ''

  for (let i = 0; i < chars.length; i++) {
    if (!specialFormat.test(chars[i])) {
      newChars += chars[i]
      continue
    }

    if (i + 1 >= chars.length) {
      continue
    }

    if (specialFormat.test(chars[i + 1])) {
      continue
    }

    newChars += chars[i + 1].toUpperCase()
    i++
  }

  return newChars
}

function translateOperationFileName (operationId: string) {
  return operationId.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}
function translateContentType (contentType:string) {
  const freeString = translateSpecialChars(contentType)

  return camelCase(freeString, { pascalCase: true })
}
function generateRequestBodySchemas (schema: any) : Array<object> {
  if (!schema?.requestBody?.content) {
    return []
  }

  const schemas = []

  for (const [contentType, descObject] of Object.entries<any>(schema.requestBody.content)) {
    const contentTypeSystemName = translateContentType(contentType)

    if (!descObject?.schema) {
      schemas.push({
        title: camelCase(contentTypeSystemName, { pascalCase: true }) + 'RequestBody',
        additionalProperties: false
      })
      continue
    }

    const schemaObject = descObject.schema
    schemaObject.title = camelCase(contentTypeSystemName, { pascalCase: true }) + 'RequestBody'

    schemas.push(schemaObject)
  }

  return schemas
}
function generateResponseBodySchemas (schema: any) : Array<object> {
  if (!schema?.responses) {
    return []
  }

  const schemas = []

  for (const [responseHttpCode, descObject] of Object.entries<any>(schema.responses)) {
    if (!descObject?.content) {
      schemas.push({
        title: 'Empty' + responseHttpCode + 'ResponseBody',
        additionalProperties: false
      })
      continue
    }
    for (const [contentType, schemaObject] of Object.entries<any>(descObject.content)) {
      if (!schemaObject?.schema) {
        continue
      }

      const contentTypeSystemName = translateContentType(contentType)
      schemaObject.schema.title = camelCase(contentTypeSystemName, { pascalCase: true }) + responseHttpCode + 'ResponseBody'

      schemas.push(schemaObject.schema)
    }
  }

  return schemas
}

function createSchemaFromParameters (inType: string, parameters: Array<any>) : object {
  const matched = parameters.filter(p => {
    if (!p?.in) {
      return false
    }

    return p.in === inType
  })

  return {
    title: camelCase(inType, { pascalCase: true }) + 'RequestParams',
    additionalProperties: false,
    type: 'object',
    required: matched.filter(p => p.required).map(p => p.name),
    properties: matched.reduce((acc, p) => ({ ...acc, [p.name]: p.schema }), {})
  }
}

function generateRequestParameters (schema: any) : Array<object> {
  let parameters = []

  if (schema?.parameters) {
    parameters = schema.parameters
  }

  const schemas = []

  schemas.push(createSchemaFromParameters('path', parameters))
  schemas.push(createSchemaFromParameters('query', parameters))
  schemas.push(createSchemaFromParameters('cookie', parameters))
  schemas.push(createSchemaFromParameters('header', parameters))

  return schemas
}

function addObjectNameTitle (title: string, schemas:Array<any>|undefined) {
  if (!schemas) {
    return
  }

  for (const [k, obj] of Object.entries<any>(schemas)) {
    let objectTitle = title

    if (obj?.title) {
      objectTitle += obj.title
    }

    obj.title = objectTitle
  }
}

async function compileSchemas (schemas: Array<any>) {
  let body = ''

  for (const [k, objSchema] of Object.entries<any>(schemas)) {
    if (!objSchema.title) {
      continue
    }

    adjustJsonSchemaForCompiler(objSchema)

    body += indentString(await jsonSchema.compile(objSchema, objSchema.title, {
      bannerComment: ''
    }), 2)
  }

  return body
}

function createTypeFromSchemas (typeName:string, schemas:Array<any>) {
  if (!schemas.length) {
    return ''
  }

  let newType = ''

  schemas.forEach((body:any) => {
    if (!body?.title) {
      return
    }

    if (!newType) {
      newType = body.title
    } else {
      newType += ' | ' + body.title
    }
  })

  return indentString(`export type ${typeName} = ${newType}\n`, 2)
}

export default async function generateApiTypes (schemasContainer: SchemasContainer) {
  const apiSchemaPath = path.join(devTools.apiSpecPath, 'api.yaml')
  const schema = await $RefParser.dereference(apiSchemaPath)

  for (const apiPath in schema?.paths) {
    for (const method in schema.paths[apiPath]) {
      const pathMethod = schema.paths[apiPath][method]

      if (!pathMethod.operationId) {
        throw new Error('Cannot find operationId in ' + apiPath)
      }

      let methodFile = 'import { Request, Response } from \'express\'\n\nexport namespace ' + camelCase(pathMethod.operationId, { pascalCase: true }) + '{\n'

      /* Generate Request body typings */
      const requestBodySchemas = generateRequestBodySchemas(pathMethod)
      methodFile += await compileSchemas(requestBodySchemas)
      const requestBodyType = createTypeFromSchemas('RequestBody', requestBodySchemas)
      methodFile += requestBodyType
      /* Generate Request parameters */
      const requestParametersSchemas = generateRequestParameters(pathMethod)
      methodFile += await compileSchemas(requestParametersSchemas)
      /* Generate Request type */
      const requestType = indentString(`export type ApiRequest = Request<Required<PathRequestParams>, ResponseBody, ${requestBodyType ? 'RequestBody' : '{}'}, QueryRequestParams>`, 2) + '\n'
      methodFile += requestType
      /* Generate Response body typings */
      const responseBodySchemas = generateResponseBodySchemas(pathMethod)
      methodFile += await compileSchemas(responseBodySchemas)
      methodFile += createTypeFromSchemas('ResponseBody', responseBodySchemas)
      /* Generate Response type */
      const responseType = indentString('export type ApiResponse = Response<ResponseBody>', 2) + '\n'
      methodFile += responseType
      /* End */
      methodFile += '}'

      schemasContainer.addSchema(methodFile, path.join('/api', translateOperationFileName(pathMethod.operationId) + '.ts'))
    }
  }
}
