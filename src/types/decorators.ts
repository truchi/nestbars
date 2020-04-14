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

export const ENTITY_OPTIONS_DEFAULTS: Required<EntityOptions> = {
  name: '',
  // implements: [],
  // abstract: false,
  description: '',
  options: {},
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
  // Object
  Object = 'object',
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
  | ObjectOptions
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

export const PRIMARY_OPTIONS_DEFAULTS: Required<PrimaryOptions> = {
  description: '',
  deprecation: '',
  options: {},
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

export const SCALAR_OPTIONS_DEFAULTS: Required<ScalarOptions> = {
  primary: false,
  unique: false,
  nullable: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
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

export const SET_OPTIONS_DEFAULTS: Required<SetOptions> = {
  primary: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
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

export const SPECIAL_OPTIONS_DEFAULTS: Required<SpecialOptions> = {
  primary: false,
  description: '',
  deprecation: '',
  options: {},
}

//
// Object fields
//

export type ObjectDecorator = (
  definition: ObjectDefinition,
  options?: ObjectOptions,
) => Function

// TODO tuples, imports
export type ObjectDefinition = GenericObjectDefinition<
  'int' | 'float' | 'string' | 'date' | 'boolean'
>

export type ObjectOptions = {
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

export const OBJECT_OPTIONS_DEFAULTS: Required<ObjectOptions> = {
  primary: false,
  unique: false,
  nullable: false,
  default: undefined,
  description: '',
  deprecation: '',
  options: {},
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
