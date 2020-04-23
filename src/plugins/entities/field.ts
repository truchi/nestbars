import { SetOptions, RelationOptions } from '../../types/decorators'
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

  const isGqlInt = types.gqlType === 'Int'
  const isGqlFloat = types.gqlType === 'Float'
  const hasJoinColumn = !!(field.options as RelationOptions<any>).joinColumn
  const hasJoinTable = !!(field.options as RelationOptions<any>).joinTable

  return {
    ...types,
    ...decorators,
    ...options,
    relation,
    hasJoinColumn,
    hasJoinTable,
    isGqlInt,
    isGqlFloat,
  }
}
