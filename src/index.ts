import { readDir } from './lib/utils'
import { cwd } from 'process'
import { data } from './lib'
export { Entity, Field } from './lib'

console.log('===================')
console.log('STARTING NESTLEBARS')
console.log('===================')

const srcDir = 'src/'
const handlebarsDir = '.handlebars/'
const tmpDir = '.tmp/'
const entitiesDir = '_handlebars/'

const currentPath = cwd() + '/'
const entitiesPath = currentPath + srcDir + entitiesDir

const entities = {}

//
//
//

const importFile = async ({ path, file }: { path: string; file: string }) => {
  const {
    default: { name },
  } = await import(path + file)

  entities[name] = { file, data: data[name] }
  return entities[name]
}

readDir(entitiesPath)
  .then(files => files.map(file => ({ path: entitiesPath, file })))
  .then(files => Promise.all(files.map(importFile)))
  .then(() => {
    console.log(JSON.stringify(entities, null, 2))
  })

// import * as HandleBars from 'handlebars'
// const compiled = HandleBars.compile(data)({ name: 'age', value: '30' })
