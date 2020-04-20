import { parse, relative } from 'path'
import { FieldType, RelationOptions } from '../../types/decorators'
import { Context } from '../../types/nestbars'
import { unique, uniqueBy } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'

export default {
  //
  // Entity
  //

  dbImports(this: Context<Entity>): string {
    const { hasJoinColumn, hasJoinTable } = this.entity.data()

    return [
      'Entity',
      ...unique(this.entity.fields.map(field => field.data().dbDecorator)),
      ...(hasJoinColumn ? ['JoinColumn'] : []),
      ...(hasJoinTable ? ['JoinTable'] : []),
    ]
      .sort()
      .join(',')
  },
  gqlImports(this: Context<Entity>): string {
    const { hasInt, hasFloat, hasEnum } = this.entity.data()

    return [
      'ObjectType',
      ...unique(this.entity.fields.map(field => field.data().gqlDecorator)),
      ...(hasInt ? ['Int'] : []),
      ...(hasFloat ? ['Float'] : []),
      ...(hasEnum ? ['registerEnumType'] : []),
    ]
      .sort()
      .join(',')
  },
  dependencies(this: Context<Entity>): { name: string; from: string }[] {
    return uniqueBy('name')(
      this.entity
        .fieldsByType(
          FieldType.OneToOne,
          FieldType.OneToMany,
          FieldType.ManyToOne,
          FieldType.ManyToMany,
        )
        .map(field => {
          const name = (field.options as RelationOptions<any>).withEntity().name
          const { dir: fromDir } = parse(this.entity.data().dest)
          const { dir: toDir, name: toName } = parse(
            Entity.find(name).data().dest,
          )
          const from = relative(fromDir, toDir) + '/' + toName

          return { name, from }
        }),
    )
  },
  enums(this: Context<Entity>): Field[] {
    return this.entity.fields.filter(
      ({ type }) => type === FieldType.Enum || type === FieldType.Set,
    )
  },
  entityData(this: Context<Entity>): object {
    return this.entity.data()
  },

  //
  // Field
  //

  fieldData(field: Field): object {
    return field.data()
  },
}
