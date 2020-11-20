import { SchemasContainer, schemaSpecPath, autoTypesPath } from './base'
import generateApiTypes from './generate-api'
import * as path from 'path'

var jsonSchema = require('json-schema-to-typescript')
var $RefParser = require('@apidevtools/json-schema-ref-parser')
var glob = require('glob')
var camelCase = require('camelcase')
const fs = require('fs')

async function generateSchemasObjects (schemasContainer: SchemasContainer) {
  const schemasPath = path.join(schemaSpecPath, '**', '*.yaml')
  const filesToProcess = glob.sync(schemasPath)

  for (let i = 0; i < filesToProcess.length; i++) {
    const filePath = filesToProcess[i]
    const fileName = path.basename(filePath, '.yaml')
    const tsName = camelCase(fileName, { pascalCase: true })

    const schema = await $RefParser.dereference(filePath)

    const ts = await jsonSchema.compile(schema, tsName, {
      bannerComment: '',
      enableConstEnums: true,
      style: {
        singleQuote: true
      }
    })

    const schemaSubPath = path.dirname(filePath.replace(schemaSpecPath, ''))
    schemasContainer.addSchema(ts, path.join('/schemas', schemaSubPath, fileName + '.ts'))
  }
}

function saveTsFiles (schemasContainer: SchemasContainer) {
  const schemas = schemasContainer.getSchemas()

  const modules = []

  for (const elem in schemas) {
    let fileContent = '/* tslint:disable */\n'
    const fileSchemas = schemas[elem]

    for (var i = 0; i < fileSchemas.length; i++) {
      fileContent += fileSchemas[i] + '\n'
    }

    const fileFullDir = path.join(autoTypesPath, elem)

    if (!fs.existsSync(path.dirname(fileFullDir))) {
      fs.mkdirSync(path.dirname(fileFullDir), {
        recursive: true
      })
    }

    fs.writeFileSync(fileFullDir, fileContent)

    const namespaceName = path.dirname(elem).substr(1)

    namespaceName.split('/').forEach((element, index, array) => {
      const moduleIndex = [...array].slice(0, index + 1).join('/')
      const prevModule = [...array].slice(0, array.length - 1).join('/')
      const rowName = array[index]

      if (index + 1 >= array.length && prevModule) {
        modules[prevModule].connectedModules.push(rowName)
      }

      if (!modules[moduleIndex]) {
        modules[moduleIndex] = {
          exportedFiles: [],
          moduleName: rowName.charAt(0).toUpperCase() + rowName.slice(1),
          connectedModules: [],
          connectedSchemas: []
        }
      }
    })

    modules[namespaceName].connectedSchemas.push(elem.substring(elem.lastIndexOf('/') + 1))
  }

  let indexFile = '/* tslint:disable */\n'

  for (var modulePath in modules) {
    let subIndex = '/* tslint:disable */\n'

    for (var connectedSchema of modules[modulePath].connectedSchemas) {
      subIndex += `export * from './${connectedSchema.replace('.ts', '')}'\n`
    }

    for (var connectedModule of new Set(modules[modulePath].connectedModules)) {
      const subModuleName = modules[modulePath + '/' + connectedModule].moduleName
      subIndex += `export * as ${subModuleName} from './${connectedModule}'\n`
    }

    if (!modulePath.match(/\//g)) {
      indexFile += `export * as ${modules[modulePath].moduleName} from './${modulePath}'\n`
    }

    fs.writeFileSync(path.join(autoTypesPath, modulePath, 'index.ts'), subIndex)
  }

  fs.writeFileSync(path.join(autoTypesPath, 'index.ts'), indexFile)
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
