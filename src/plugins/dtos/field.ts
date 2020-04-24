import {
  PrimaryOptions,
  SpecialOptions,
  FieldType,
} from '../../types/decorators'
import { Field } from '../../lib/data/Field'
import entitiesField from '../entities/field'

export default (type: string, field: Field): object => {
  const data = entitiesField('entity', field)

  const isPrimary = field.is(PrimaryOptions) || !!(field.options as any).primary
  const isGenerated = field.is(PrimaryOptions, SpecialOptions)
  const isData =
    !isPrimary &&
    !isGenerated &&
    (!field.is(FieldType.OneToOne) || data.hasJoinColumn) &&
    !field.is(FieldType.OneToMany) &&
    (!field.is(FieldType.ManyToMany) || data.hasJoinTable)

  const partialGqlOptions = {
    ...data.gqlOptions,
    nullable: true,
    defaultValue: undefined,
  }

  return {
    ...data,
    isPrimary,
    isData,
    partialGqlOptions,
  }
}
