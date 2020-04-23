import {
  SetOptions,
  RelationOptions,
  PrimaryOptions,
  SpecialOptions,
  FieldType,
} from '../../types/decorators'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import toTypes from './lib/toTypes'
import toDecorators from './lib/toDecorators'
import toOptions from './lib/toOptions'

export default (type: string, field: Field) => {
  let name = ''
  let relation: Entity

  if (field.options instanceof SetOptions) {
    name = field.options.name
  } else if (field.options instanceof RelationOptions) {
    name = field.options.withEntity().name
    relation = Entity.find(name)
  }

  const types = toTypes(field, name)
  const decorators = toDecorators(field)
  const options = toOptions(field, types.dbType)

  const isPrimary = field.is(PrimaryOptions) || !!(options as any).primary
  const isGenerated = field.is(PrimaryOptions, SpecialOptions)
  const hasJoinColumn = !!(field.options as RelationOptions<any>).joinColumn
  const hasJoinTable = !!(field.options as RelationOptions<any>).joinTable
  const isData =
    !isPrimary &&
    !isGenerated &&
    (!field.is(FieldType.OneToOne) || hasJoinColumn) &&
    !field.is(FieldType.OneToMany) &&
    (!field.is(FieldType.ManyToMany) || hasJoinTable)

  return {
    ...types,
    ...decorators,
    ...options,
    relation,
    isPrimary,
    isGenerated,
    hasJoinColumn,
    hasJoinTable,
    isData,
  }
}
