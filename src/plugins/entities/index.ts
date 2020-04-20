import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { RelationOptions, FieldType } from '../../types/decorators'
import { pick, unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import toOptions from './lib/toOptions'
import toDecorator from './lib/toDecorators'

export default ((entities: Entity[], path: PathFunction): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  entityData: (entity: Entity) => {
    const { name, fields, options } = entity

    const enums = entity.byType(FieldType.Enum, FieldType.Set)
    const joins = entity.byType(
      FieldType.OneToOne,
      FieldType.ManyToOne,
      FieldType.ManyToMany,
    )
    const hasInt = !!entity.byType(FieldType.Int).length
    const hasFloat = !!entity.byType(FieldType.Float).length
    const hasEnum = !!enums.length
    const hasJoinColumn = !!joins.filter(
      ({ options }) => !!(options as RelationOptions<any>).joinColumn,
    ).length
    const hasJoinTable = !!joins.filter(
      ({ options }) => !!(options as RelationOptions<any>).joinTable,
    ).length

    return {
      path: path('entity', name),
      dbDecorator: 'Entity',
      gqlDecorator: 'ObjectType',
      dbOptions: Object.assign(pick(options, ['name']), options.options),
      gqlOptions: pick(options, ['description']),
      enums,
      dbImports: [
        'Entity',
        ...unique(fields.map(field => field.data().dbDecorator)),
        ...(hasJoinColumn ? ['JoinColumn'] : []),
        ...(hasJoinTable ? ['JoinTable'] : []),
      ].sort(),
      gqlImports: [
        'ObjectType',
        ...unique(fields.map(field => field.data().gqlDecorator)),
        ...(hasInt ? ['Int'] : []),
        ...(hasFloat ? ['Float'] : []),
        ...(hasEnum ? ['registerEnumType'] : []),
      ].sort(),
    }
  },
  fieldData: (field: Field) => {
    const { type, options } = field

    const { dbDecorator, gqlDecorator } = toDecorator(type)
    const { dbOptions, gqlOptions } = toOptions(options, field.dbType)

    return {
      dbDecorator,
      gqlDecorator,
      dbOptions,
      gqlOptions,
    }
  },
})) as Plugin
