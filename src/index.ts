import { UserConfig } from './types'
import { sanitizeConfig, DATA } from './lib'

// Re-exports for user
export * from './lib/decorators'

const templatesPath = `${__dirname}/../src/templates`

export default async (userConfig: UserConfig) => {
  const config = await sanitizeConfig(userConfig, templatesPath)
  console.log('dest     :', config.dest('NAME', 'TYPE'))
  console.log('templates:', config.templates('NAME', 'TYPE'))
  console.log('DATA', JSON.stringify(DATA, null, 2))
}

// ==========================

// console.log('===================')
// console.log('STARTING NESTLEBARS')
// console.log('===================')

// const templatesPath = `${__dirname}/../src/templates`
// const entities = {}

// //
// //
// //

// console.log(resolve(templatesPath))

// const importFile = async ({
//   file,
//   content,
// }: {
//   file: string
//   content: string
// }) => {
//   const {
//     default: { name: entity },
//   } = await import(file)

//   entities[entity] = { file, data: data[entity] }
//   return entities[entity]
// }
// ;(async () => {
//   const config = await getConfig(templatesPath)
//   console.log('config', JSON.stringify(config, null, 2))
//   console.log(config.templates('entity'))
//   Promise.all(config.src.map(readFile))
//     .then(files =>
//       files.map(({ file, content }) => ({ file, content: transpile(content) })),
//     )
//     .then(files => files.map(({ content }) => console.log(content)))
//   // .then(files => Promise.all(files.map(importFile)))
//   // .then(() => {
//   //   console.log(JSON.stringify(entities, null, 2))
//   // })
// })()

// // import * as HandleBars from 'handlebars'
// // const compiled = HandleBars.compile(data)({ name: 'age', value: '30' })
