import { PathFunction } from '../../types/utils'
import { RelationOptions, FieldType } from '../../types/decorators'
import { pick, unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import toDecorator from './toDecorators'

export default (path: PathFunction) =>
  //
  (entity: Entity) => ({
    path: path('entity', entity.name),
    dbOptions: Object.assign(
      pick(entity.options, ['name']),
      entity.options.options,
    ),
    gqlOptions: pick(entity.options, ['description']),
    hasEnums: !!entity.enums.length,
    hasInt: !!entity.by(FieldType.Int).length,
    hasFloat: !!entity.by(FieldType.Float).length,
    hasJoinColumn: !!entity
      .by(RelationOptions)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinColumn)
      .length,
    hasJoinTable: !!entity
      .by(RelationOptions)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinTable)
      .length,
    fieldDbDecorators: unique(
      entity.fields.map(field => toDecorator(field).dbDecorator),
    ),
  })
