import { FieldType, ScalarOptions } from '../../types/decorators'
import { assign } from '../utils'
import { Field } from './Field'

export class ScalarField extends Field<ScalarOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: ScalarOptions,
    readonly type:
      | FieldType.Int
      | FieldType.Float
      | FieldType.String
      | FieldType.Date
      | FieldType.Boolean,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { primary, unique, nullable, default: dflt, description },
    } = this

    return assign(
      super.dbOptions(),
      {
        primary,
        unique,
        nullable,
        default: dflt,
        comment: description,
      },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { nullable, default: dflt, description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        nullable,
        defaultValue: dflt,
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}
