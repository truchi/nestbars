import { FieldOptions } from '../../../types/decorators'

export type Options = {
  options: FieldOptions
  db: object
  gql: object
}

export const OptionsFactory = (options: FieldOptions): Options => ({
  options,
  db: {},
  gql: {},
})
