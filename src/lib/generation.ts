import * as HandleBars from 'handlebars'
import { Config } from '../types/Config'
import { readFile, writeFile } from './utils'
import { Data, DATA } from './data'

export const generate = async (config: Config, templatePath: string) => {
  registerHelpers(helpers)
  await registerPartials(partials, templatePath)

  const entities = toArray(DATA)

  await Promise.all(
    entities.map(async entity => {
      const { name } = entity
      const dest = config.dest(name, 'entity')
      const template = await readFile(config.templates(name, 'entity'))
      const compiled = HandleBars.compile(template)({ entities, entity })

      await writeFile(dest, compiled)
    }),
  )
}

const helpers = {
  $fieldType(field: Data[string]['fields'][string]) {
    switch (field.type) {
      case 'id':
      case 'int':
      case 'version':
      case 'float':
        return 'number'
      case 'uuid':
      case 'string':
        return 'string'
      case 'created':
      case 'updated':
      case 'date':
        return 'Date'
      case 'boolean':
        return 'boolean'
      case 'set':
      case 'enum':
        return field.tsName
      case 'oneToOne':
      case 'manyToOne':
        return field.withEntity().name
      case 'oneToMany':
      case 'manyToMany':
        return field.withEntity().name + '[]'
      case 'object':
        return toTs(field.definition)
    }

    return ''
  },
}

const partials = ['field']

const registerHelpers = (helpers: any) =>
  Object.entries(helpers).map(registerHelper)

const registerHelper = ([name, helper]: [string, (...args: any[]) => any]) =>
  HandleBars.registerHelper(name, helper)

const registerPartials = async (partials: string[], templatePath: string) =>
  Promise.all(
    partials.map(async (partial: string) =>
      HandleBars.registerPartial(
        partial,
        await readFile(`${templatePath}/partials/${partial}.ts.hbs`),
      ),
    ),
  )

const toArray = (data: Data) =>
  Object.values(data).map(entity => ({
    ...entity,
    fields: Object.values(entity.fields),
  }))

const objectToTs = (o: object) =>
  '{' +
  Object.entries(o)
    .map(([key, value]) => `${key}: ${toTs(value)};`)
    .join('') +
  '}'

const arrayToTs = (xs: any[]) => '(' + xs.map(x => toTs(x)).join('|') + ')[]'

const toTs = (definition: any[] | object | string) => {
  //
  if (typeof definition === 'string') {
    switch (definition) {
      case 'int':
        return 'number'
      case 'float':
        return 'number'
      case 'string':
        return 'string'
      case 'date':
        return 'Date'
      case 'boolean':
        return 'boolean'
    }

    return ''
  }

  return Array.isArray(definition)
    ? arrayToTs(definition)
    : objectToTs(definition)
}
