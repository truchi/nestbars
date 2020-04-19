import { SetOptions, RelationOptions } from '../../../types/decorators'
import { Field } from '../../../lib/data/Field'
import toTypes from './toTypes'
import toOptions from './toOptions'
import toDecorator from './toDecorators'

export class FieldData {
  readonly field: Field
  readonly dbDecorator: string
  readonly gqlDecorator: string
  readonly tsType: string
  readonly gqlType: string
  readonly dbOptions: {}
  readonly gqlOptions: {}

  constructor(field: Field) {
    this.field = field

    const { type, options } = field
    const name =
      options instanceof SetOptions
        ? options.name
        : options instanceof RelationOptions
        ? options.withEntity().name
        : ''

    const { dbDecorator, gqlDecorator } = toDecorator(type)
    this.dbDecorator = dbDecorator
    this.gqlOptions = gqlDecorator

    const { tsType, dbType, gqlType } = toTypes(type, name)
    this.tsType = tsType
    this.gqlType = gqlType

    const { dbOptions, gqlOptions } = toOptions(options)
    this.dbOptions = { dbType, ...dbOptions }
    this.gqlOptions = gqlOptions
  }
}
