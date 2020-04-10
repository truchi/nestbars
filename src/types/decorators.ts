// TODO user documentation
import { ObjectDefinition } from '.'

//
// Decorators arguments
//

export type FieldType =
  | 'id'
  | 'uuid'
  | 'created'
  | 'updated'
  | 'version'
  | Scalar
  | Enum
  | Set
  | ObjectDefinition<Scalar>

export type FieldOptions = {
  name?: string
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
  data?: object
}

//
// Field types
//

type Scalar = 'int' | 'float' | 'string' | 'date' | 'boolean'

type Enum = {
  enum: string
  values: (string | number)[]
  default: string | number
  union?: boolean
  description?: string
}

type Set = {
  set: string
  values: (string | number)[]
  default: (string | number)[]
  union?: boolean
  description?: string
}
