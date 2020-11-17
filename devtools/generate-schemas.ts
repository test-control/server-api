import * as devTools from './base'
import { SchemasContainer } from './base'
import generateApiTypes from './generate-api'

var jsonSchema = require('json-schema-to-typescript')
var $RefParser = require('@apidevtools/json-schema-ref-parser')
var glob = require('glob')
var camelCase = require('camelcase')
const fs = require('fs')
const path = require('path')

async function generateSchemasObjects (schemasContainer: SchemasContainer) {
  const schemasPath = path.join(devTools.apiSpecPath, 'schemas', '**', '*.yaml')
  const filesToProcess = glob.sync(schemasPath)

  for (let i = 0; i < filesToProcess.length; i++) {
    const filePath = filesToProcess[i]
    const fileName = path.basename(filePath, '.yaml')
    const tsName = camelCase(fileName, { pascalCase: true })
    const schema = await $RefParser.dereference(filePath)

    const ts = await jsonSchema.compile(schema, tsName, {
      bannerComment: ''
    })

    const schemaSubPath = path.dirname(filePath.replace(devTools.apiSpecPath, ''))

    schemasContainer.addSchema(ts, path.join(schemaSubPath, fileName + '.ts'))
  }
}

function saveTsFiles (schemasContainer: SchemasContainer) {
  const schemas = schemasContainer.getSchemas()
  let indexFile = ''

  for (const elem in schemas) {
    let fileContent = '/* tslint:disable */\n'
    const fileSchemas = schemas[elem]

    for (var i = 0; i < fileSchemas.length; i++) {
      fileContent += fileSchemas[i] + '\n'
    }

    const fileFullDir = path.join(devTools.autoTypesPath, elem)

    if (!fs.existsSync(path.dirname(fileFullDir))) {
      fs.mkdirSync(path.dirname(fileFullDir))
    }

    fs.writeFileSync(fileFullDir, fileContent)

    indexFile += `export * from '.${elem.replace('.ts', '')}'\n`
  }

  fs.writeFileSync(path.join(devTools.autoTypesPath, 'index.ts'), indexFile)
}

async function generateTypes () {
  const schemaContainer = new SchemasContainer()

  await generateApiTypes(schemaContainer)
  await generateSchemasObjects(schemaContainer)

  saveTsFiles(schemaContainer)
}

generateTypes().then(function () {
  console.log('Done.')
})
