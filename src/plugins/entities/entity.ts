import { PathFunction } from '../../types/utils'
import { FieldType, SetOptions, RelationOptions } from '../../types/decorators'
import { pick, unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'

export default (entitiesPath: PathFunction) =>
  //
  (type: string, entity: Entity) => {
    const entityPath = entitiesPath(type, entity.name)

    const enums = entity.by(SetOptions)
    const relations = unique(
      entity
        .by(RelationOptions)
        .map(field => field.data().relation)
        .filter(x => x),
    )

    const fieldDbDecorators = unique(
      entity.fields.map(field => field.data().dbDecorator),
    )
    const hasFields = entity.fields.length
    const hasEnums = enums.length
    const hasInt = !!entity.by(FieldType.Int).length
    const hasFloat = !!entity.by(FieldType.Float).length
    const hasJoinColumn = !!entity.fields.filter(
      field => field.data().hasJoinColumn,
    ).length
    const hasJoinTable = !!entity.fields.filter(
      field => field.data().hasJoinTable,
    ).length

    const dbOptions = Object.assign(
      pick(entity.options, ['name']),
      entity.options.options,
    )
    const gqlOptions = pick(entity.options, ['description'])

    return {
      entityPath,
      enums,
      relations,
      fieldDbDecorators,
      hasFields,
      hasEnums,
      hasInt,
      hasFloat,
      hasJoinColumn,
      hasJoinTable,
      dbOptions,
      gqlOptions,
    }
  }
