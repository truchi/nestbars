import {
  FieldType,
  SetValues,
  SetTsName,
  SetOptions,
} from '../../types/decorators'
import { assign } from '../utils'
import { Field } from './Field'

export class SetField extends Field<SetOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly values: SetValues,
    readonly tsName: SetTsName,
    readonly options: SetOptions,
    readonly type: FieldType.Enum | FieldType.Set,
  ) {
    super(entity, name, options, type)
  }

  tsType(): string {
    return this.type === FieldType.Enum ? this.tsName : this.tsName + '[]'
  }

  gqlType(): string {
    return this.type === FieldType.Enum ? this.tsName : '[' + this.tsName + ']'
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      tsName,
      options: { primary, default: dflt, description },
    } = this

    return assign(
      super.dbOptions(),
      {
        primary,
        enum: tsName,
        default: dflt,
        comment: description || undefined,
      },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { default: dflt, description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        defaultValue: dflt,
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}
