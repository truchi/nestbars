import { Class, ObjectDefinition as GenericObjectDefinition } from './utils'

//
// Entity
//

export type EntityDecorator = (options?: EntityOptions) => Function

export type EntityOptions = {
  name?: string
  // implements?: string[]
  // abstract?: boolean
  description?: string
  options?: object
}

//
// Fields
//

export enum FieldType {
  // Primary
  Id = 'id',
  Uuid = 'uuid',
  // Scalar
  Int = 'int',
  Float = 'float',
  String = 'string',
  Date = 'date',
  Boolean = 'boolean',
  // Set
  Enum = 'enum',
  Set = 'set',
  // Special
  Created = 'created',
  Updated = 'updated',
  Version = 'version',
  // Relation
  OneToOne = 'one-to-one',
  OneToMany = 'one-to-many',
  ManyToOne = 'many-to-one',
  ManyToMany = 'many-to-many',
}

export type FieldOptions =
  | PrimaryOptions
  | ScalarOptions
  | SetOptions
  | SpecialOptions
  | {} // TOOD void?

//
// Primary fields
//

export type PrimaryDecorator = (options?: PrimaryOptions) => Function

export type PrimaryOptions = {
  description?: string
  deprecation?: string
  options?: object
}

//
// Scalar fields
//

export type ScalarDecorator = (options?: ScalarOptions) => Function

export type ScalarOptions = {
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any // TODO better type with generic?
  description?: string
  deprecation?: string
  options?: object
}

//
// Set fields
//

export type SetDecorator = (
  values: SetValues,
  tsName: SetTsName,
  options?: SetOptions,
) => Function

export type SetValues = string[]

export type SetTsName = string

// TODO numeric, imports
export type SetOptions = {
  primary?: boolean
  default?: any // TODO string / string[]
  description?: string
  deprecation?: string
  options?: object
}

//
// Special fields
//

export type SpecialDecorator = (options?: SpecialOptions) => Function

export type SpecialOptions = {
  primary?: boolean
  description?: string
  deprecation?: string
  options?: object
}

//
// Relations fields
//

export type OneToOneDecorator<T extends Class> = (
  withEntity: RelationWithEntity<T>,
  withField: RelationWithField<T>,
  joinColumn?: RelationJoinColumn,
) => Function

export type OneToManyDecorator<T extends Class> = (
  withEntity: RelationWithEntity<T>,
  withField: RelationWithField<T>,
) => Function

export type ManyToOneDecorator<T extends Class> = (
  withEntity: RelationWithEntity<T>,
  withField: RelationWithField<T>,
  joinColumn?: RelationJoinColumn,
) => Function

export type ManyToManyDecorator<T extends Class> = (
  withEntity: RelationWithEntity<T>,
  withField: RelationWithField<T>,
  joinTable?: RelationJoinTable,
) => Function

export type RelationWithEntity<T> = () => T

export type RelationWithField<T extends Class> = keyof InstanceType<T>

export type RelationJoinColumn = boolean | object

export type RelationJoinTable = boolean | object

// TODO options: primary, nullable, cascade, ...
// https://github.com/typeorm/typeorm/blob/a4dec02cc59d3219a29c7be0322af2253e1452dc/src/decorator/options/RelationOptions.ts
