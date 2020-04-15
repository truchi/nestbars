import { FieldType, PrimaryOptions } from '../../types/decorators'
import { assign } from '../utils'
import { Field } from './Field'

export class PrimaryField extends Field<PrimaryOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: PrimaryOptions,
    readonly type: FieldType.Id | FieldType.Uuid,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { description },
    } = this

    return assign(
      super.dbOptions(),
      { type: undefined },
      { comment: description },
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
