import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { SetOptions, RelationOptions } from '../../types/decorators'
import { pick } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import helpers from './helpers'
import toTypes from './lib/toTypes'
import toOptions from './lib/toOptions'
import toDecorator from './lib/toDecorators'

const entity: Plugin = (
  entities: Entity[],
  dest: PathFunction,
): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  helpers,
  entityData: ({ name, options }: Entity) => {
    const dbOptions = Object.assign(pick(options, ['name']), options.options)
    const gqlOptions = pick(options, ['description'])

    return {
      dbDecorator: 'Entity',
      gqlDecorator: 'ObjectType',
      dbOptions,
      gqlOptions,
      dest: dest('entity', name),
    }
  },
  fieldData: ({ type, options }: Field) => {
    const name =
      options instanceof SetOptions
        ? options.name
        : options instanceof RelationOptions
        ? options.withEntity().name
        : ''

    const { dbDecorator, gqlDecorator } = toDecorator(type)
    const { tsType, dbType, gqlType } = toTypes(type, name)
    const { dbOptions, gqlOptions } = toOptions(options)

    return {
      dbDecorator,
      gqlDecorator,
      tsType,
      gqlType,
      dbOptions: { type: dbType, ...dbOptions },
      gqlOptions,
    }
  },
})

export default entity
