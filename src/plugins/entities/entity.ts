import { PathFunction } from '../../types/utils'
import { FieldType, SetOptions, RelationOptions } from '../../types/decorators'
import { pick, unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import toDecorator from './toDecorators'

export default (path: PathFunction) =>
  //
  (type: string, entity: Entity) => ({
    path: path('entity', entity.name),
    fieldDbDecorators: unique(
      entity.fields.map(field => toDecorator(field).dbDecorator),
    ),
    enums: entity.by(SetOptions),
    relations: unique(
      entity.by(RelationOptions).map(({ relation }) => relation),
    ),
    hasInt: !!entity.by(FieldType.Int).length,
    hasFloat: !!entity.by(FieldType.Float).length,
    hasJoinColumn: !!entity.fields.filter(({ hasJoinColumn }) => hasJoinColumn)
      .length,
    hasJoinTable: !!entity.fields.filter(({ hasJoinTable }) => hasJoinTable)
      .length,
    hasFields: entity.fields.length,
    dbOptions: Object.assign(
      pick(entity.options, ['name']),
      entity.options.options,
    ),
    gqlOptions: pick(entity.options, ['description']),
  })
