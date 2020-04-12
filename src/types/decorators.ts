// TODO user documentation
import { Class, ObjectDefinition as GenericObjectDefinition } from './utils'

//
// Entity
//

export type EntityOptions = {
  name?: string
  implements?: string[]
  abstract?: boolean
  description?: string
}

//
// Primary fields
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
// Scalar fields
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
// Set fields
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
// Special fields
//

export enum SpecialType {
  Created = 'created',
  Updated = 'updated',
  Version = 'version',
}

export type SpecialOptions = {
  name?: string
  primary?: boolean
  description?: string
  deprecation?: string
  options?: object
}

//
// Object fields
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

//
// Relations fields
//

export enum RelationType {
  OneToOne = 'oneToOne',
  OneToMany = 'oneToMany',
  ManyToOne = 'manyToOne',
  ManyToMany = 'manyToMany',
}

export type RelationEntity = () => Class

export type RelationField = string

export type RelationColumn = boolean | object

export type RelationTable = boolean | object
