import { FieldType, RelationOptions } from '../../types/decorators'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'

export default {
  //
  // Entity
  //

  enums(entity: Entity): Field[] {
    return entity.fields.filter(
      ({ type }) => type === FieldType.Enum || type === FieldType.Set,
    )
  },
  hasJoinColumn(entity: Entity): boolean {
    return !!entity
      .fieldsByType(FieldType.OneToOne, FieldType.ManyToOne)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinColumn)
      .length
  },
  hasJoinTable(entity: Entity): boolean {
    return !!entity
      .fieldsByType(FieldType.ManyToMany)
      .filter(({ options }) => !!(options as RelationOptions<any>).joinTable)
      .length
  },

  //
  // Field
  //
}
