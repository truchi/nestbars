// TODO user documentation
import { ObjectDefinition as GenericObjectDefinition } from './utils'

//
// Primary
//

export enum PrimaryType {
  Id = 'id',
  Uuid = 'uuid',
}

export type PrimaryOptions = {
  name?: string
  description?: string
  deprecation?: string
  options?: object
}

//
// Scalar
//

export enum ScalarType {
  Int = 'int',
  Float = 'float',
  String = 'string',
  Date = 'date',
  Boolean = 'boolean',
}

export type ScalarOptions = {
  name?: string
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

//
// Set
//

export enum SetType {
  Enum = 'enum',
  Set = 'set',
}

export type SetValues = string[]

export type SetTsName = string

export type SetOptions = {
  name?: string
  primary?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

//
// Special
//

export enum SpecialType {
  Created = 'Created',
  Updated = 'Updated',
  Version = 'Version',
}

export type SpecialOptions = {
  name?: string
  primary?: boolean
  description?: string
  deprecation?: string
  options?: object
}

//
// Object
//

export enum ObjectType {
  Object = 'object',
}

export type ObjectDefinition = GenericObjectDefinition<
  'int' | 'float' | 'string' | 'date' | 'boolean'
>

export type ObjectOptions = {
  name?: string
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

// ===================================
// ===================================
// ===================================

// //
// // Decorators arguments
// //

// export type FieldType =
//   | 'id'
//   | 'uuid'
//   | 'created'
//   | 'updated'
//   | 'version'
//   | Scalar
//   | Enum
//   | Set
//   | ObjectDefinition<Scalar>

// export type IdOptions = {
//   type: 'id' | 'uuid'
//   name?: string
//   description?: string
//   deprecation?: string
//   options?: object
// }

// export type SpecialOptions = {
//   type: 'created' | 'updated' | 'version'
//   name?: string
//   primary?: boolean
//   description?: string
//   deprecation?: string
//   options?: object
//   data?: object
// }

// export type FieldOptions = {
//   name?: string
//   primary?: boolean
//   unique?: boolean
//   nullable?: boolean
//   default?: any
//   description?: string
//   deprecation?: string
//   options?: object
//   data?: object
// }

// //
// // Field types
// //

// type Scalar = 'int' | 'float' | 'string' | 'date' | 'boolean'

// type Enum = {
//   enum: string
//   values: (string | number)[]
//   default: string | number
//   union?: boolean
//   description?: string
// }

// type Set = {
//   set: string
//   values: (string | number)[]
//   default: (string | number)[]
//   union?: boolean
//   description?: string
// }
