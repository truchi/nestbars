import {
  ScalarOptions,
  PrimaryOptions,
  SpecialOptions,
  SetOptions,
  RelationOptions,
} from '../../../types/decorators'
import { pick, rename, assertNever } from '../../../lib/utils'
import { Field } from '../../../lib/data/Field'

type Options = {
  dbOptions: object
  gqlOptions: object
}

export default ({ options }: Field, type: string): Options => ({
  dbOptions: (() => {
    if (options instanceof ScalarOptions) {
      return Object.assign(
        { type },
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
        { type },
        rename(pick(options, ['description']), { description: 'comment' }),
        options.options,
      )
    } //
    else if (options instanceof SpecialOptions) {
      return Object.assign(
        { type },
        rename(pick(options, ['primary', 'description']), {
          description: 'comment',
        }),
        options.options,
      )
    } //
    else if (options instanceof SetOptions) {
      return Object.assign(
        { type },
        rename(pick(options, ['name', 'primary', 'default', 'description']), {
          name: 'enum',
          description: 'comment',
        }),
        options.options,
      )
    } //
    else if (options instanceof RelationOptions) {
      return {}
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
      return {}
    } //
    else {
      assertNever(options, __filename, 'gqlOptions')
    }
  })(),
})
