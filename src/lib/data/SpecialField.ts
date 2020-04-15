import { FieldType, SpecialOptions } from '../../types/decorators'
import { assign } from '../utils'
import { Field } from './Field'

export class SpecialField extends Field<SpecialOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: SpecialOptions,
    readonly type: FieldType.Created | FieldType.Updated | FieldType.Version,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { primary, description },
    } = this

    return assign(
      super.dbOptions(),
      { primary, comment: description },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}
