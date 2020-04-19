import {
  ScalarOptions,
  FieldOptions,
  PrimaryOptions,
  SpecialOptions,
  SetOptions,
  RelationOptions,
} from '../../../types/decorators'
import { pick, rename, assertNever } from '../../../lib/utils'

type Options = {
  dbOptions: object
  gqlOptions: object
}

export default (options: FieldOptions): Options => ({
  dbOptions: (() => {
    if (options instanceof ScalarOptions) {
      return Object.assign(
        {},
        rename(
          pick(options, [
            'primary',
            'unique',
            'nullable',
            'default',
            'description',
          ]),
          { description: 'comment' },
        ),
        options.options,
      )
    } //
    else if (options instanceof PrimaryOptions) {
      return Object.assign(
        {},
        rename(pick(options, ['description']), { description: 'comment' }),
        options.options,
      )
    } //
    else if (options instanceof SpecialOptions) {
      return Object.assign(
        {},
        rename(pick(options, ['primary', 'description']), {
          description: 'comment',
        }),
        options.options,
      )
    } //
    else if (options instanceof SetOptions) {
      return Object.assign(
        {},
        rename(pick(options, ['name', 'primary', 'default', 'description']), {
          name: 'enum',
          description: 'comment',
        }),
        options.options,
      )
    } //
    else if (options instanceof RelationOptions) {
      return pick(options, ['description'])
    } //
    else {
      assertNever(options, __filename, 'gqlOptions')
    }
  })(),
  gqlOptions: (() => {
    if (options instanceof ScalarOptions) {
      return rename(
        pick(options, ['nullable', 'default', 'description', 'deprecation']),
        {
          default: 'defaultValue',
          deprecation: 'deprecationReason',
        },
      )
    } //
    else if (
      options instanceof PrimaryOptions ||
      options instanceof SpecialOptions
    ) {
      return rename(pick(options, ['description', 'deprecation']), {
        deprecation: 'deprecationReason',
      })
    } //
    else if (options instanceof SetOptions) {
      return rename(pick(options, ['default', 'description', 'deprecation']), {
        default: 'defaultValue',
        deprecation: 'deprecationReason',
      })
    } //
    else if (options instanceof RelationOptions) {
      return rename(pick(options, ['description', 'deprecation']), {
        deprecation: 'deprecationReason',
      })
    } //
    else {
      assertNever(options, __filename, 'gqlOptions')
    }
  })(),
})
