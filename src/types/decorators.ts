// TODO user documentation
import { Class, ObjectDefinition } from '.'

//
// Decorators arguments
//

export type EntityArgs = {
  name?: string
  implements?: string[]
  description?: string
}

export type FieldArgs = {
  type: Scalar | Enum | Set | ObjectDefinition<Scalar>
  nullable?: boolean
  primary?: boolean
  manyToOne?: [string, string]
  oneToMany?: [string, string]
}

export type OneToManyArgs<
  //
  One,
  // One extends (...args: any[]) => any,
  Many extends Class
> = {
  type: any
  field: (entity: any) => any
  // type: Many
  // field: (entity: Many) => ReturnType<One>
}

export type ManyToOneArgs<
  Many,
  // Many extends (...args: any[]) => any,
  One extends Class
> = {
  type: any
  field: (entity: any) => any
  // type: One
  // field: (entity: One) => ReturnType<Many>[]
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
