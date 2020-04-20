import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { SetOptions, RelationOptions, FieldType } from '../../types/decorators'
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
  entityData: (entity: Entity) => {
    const { name, options } = entity

    const dbOptions = Object.assign(pick(options, ['name']), options.options)
    const gqlOptions = pick(options, ['description'])
    const hasInt = !!entity.fieldsByType(FieldType.Int).length
    const hasFloat = !!entity.fieldsByType(FieldType.Float).length
    const hasEnum = !!entity.fieldsByType(FieldType.Enum, FieldType.Set).length
    const hasJoinColumn = !!entity
      .fieldsByType(FieldType.OneToOne, FieldType.ManyToOne)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinColumn)
      .length
    const hasJoinTable = !!entity
      .fieldsByType(FieldType.ManyToMany)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinTable)
      .length

    return {
      dbDecorator: 'Entity',
      gqlDecorator: 'ObjectType',
      dbOptions,
      gqlOptions,
      dest: dest('entity', name),
      hasInt,
      hasFloat,
      hasEnum,
      hasJoinColumn,
      hasJoinTable,
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
    const { dbOptions, gqlOptions } = toOptions(options, dbType)

    return {
      dbDecorator,
      gqlDecorator,
      tsType,
      dbType,
      gqlType,
      dbOptions,
      gqlOptions,
    }
  },
})

export default entity
