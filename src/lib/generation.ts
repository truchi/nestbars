import * as HandleBars from 'handlebars'
import { flat, objectDefinitionRecursion } from './utils'
import { Config } from '../types/Config'
import { readFile, writeFile, relativeImport } from './utils'
import { Data, DATA } from './data'

type Entity = Data[string]
type Field = Entity['fields'][string]
type Entities = {
  [key: string]: Entity & { dest: string }
}
type EntityContext = {
  entities: Entities
  entity: Entity
}

export const generate = async (config: Config, templatePath: string) => {
  registerHelpers(helpers)
  await registerPartials(partials, templatePath)

  const entities: Entities = Object.entries(DATA)
    //
    .reduce(
      (entities, [name, entity]) => ({
        ...entities,
        [name]: { ...entity, dest: config.dest(name, 'entity') },
      }),
      {},
    )

  await Promise.all(
    Object.values(entities).map(async entity => {
      const { name, dest } = entity
      const template = await readFile(config.templates(name, 'entity'))
      const compiled = HandleBars.compile(template)({ entities, entity })

      await writeFile(dest, compiled)
    }),
  )
}

const helpers = {
  $values(o: object) {
    return Object.values(o)
  },
  $imports(this: EntityContext, { fn }) {
    const { entities, entity } = this
    const { dest } = entities[entity.name]

    return flat(
      Object.values(entities[entity.name].fields)
        .filter(({ type }) =>
          [
            'object',
            'oneToOne',
            'oneToMany',
            'manyToOne',
            'manyToMany',
          ].includes(type),
        )
        .map(({ definition, withEntity }: any) =>
          withEntity
            ? withEntity().name
            : objectDefinitionRecursion(
                definition,
                (xs, recur) => flat(xs.map(recur)),
                (o, recur) => flat(Object.values(o).map(recur)),
                () => undefined,
                fn => fn.name,
              ),
        ),
    )
      .filter(x => x)
      .map(entity =>
        fn({
          name: entity,
          dest: relativeImport(dest, entities[entity].dest),
        }),
      )
      .join('')
  },
  $fieldType(field: Field) {
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

const toTs = (definition: any[] | object) =>
  objectDefinitionRecursion(
    definition,
    (xs, recur) => '(' + xs.map(x => recur(x)).join('|') + ')[]',
    (o, recur) =>
      '{' +
      Object.entries(o)
        .map(([key, value]) => `${key}: ${recur(value)};`)
        .join('') +
      '}',
    type => {
      switch (type) {
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
    },
    fn => fn.name,
  )
