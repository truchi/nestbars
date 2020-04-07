// TODO user documentation

export type Type =
  | 'int'
  | 'float'
  | 'string'
  | 'date'
  | {
      enum: string[]
      default: string
      name: string
      description?: string
    }

export type FieldArgs = {
  type?: Type
  primary?: boolean
  manyToOne?: [string, string]
  oneToMany?: [string, string]
}
