import { resolve } from 'path'
import { data } from './lib/decorators'
import { getConfig } from './lib/config'
import { readFile } from './lib/utils'
import { transpile } from './lib/load'

// Re-exports for user
export { Entity, Field } from './lib/decorators'

console.log('===================')
console.log('STARTING NESTLEBARS')
console.log('===================')

const templatesPath = `${__dirname}/../src/templates`
const entities = {}

//
//
//

console.log(resolve(templatesPath))

const importFile = async ({
  file,
  content,
}: {
  file: string
  content: string
}) => {
  const {
    default: { name: entity },
  } = await import(file)

  entities[entity] = { file, data: data[entity] }
  return entities[entity]
}
;(async () => {
  const config = await getConfig(templatesPath)
  console.log('config', JSON.stringify(config, null, 2))
  console.log(config.templates('entity'))
  Promise.all(config.src.map(readFile))
    .then(files =>
      files.map(({ file, content }) => ({ file, content: transpile(content) })),
    )
    .then(files => files.map(({ content }) => console.log(content)))
  // .then(files => Promise.all(files.map(importFile)))
  // .then(() => {
  //   console.log(JSON.stringify(entities, null, 2))
  // })
})()

// import * as HandleBars from 'handlebars'
// const compiled = HandleBars.compile(data)({ name: 'age', value: '30' })
