import { Class, PathFunction } from '../../types/utils'
import { FieldType, RelationOptions } from '../../types/decorators'
import { Entity, Field } from '../../lib/data'

export default (entities: Class[], dest: PathFunction) => ({
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
})
