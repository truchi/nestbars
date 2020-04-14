import { Class, ObjectDefinition as GenericObjectDefinition } from './utils'

//
// Entity
//

export type EntityDecorator = (options?: EntityOptions) => Function

export type EntityOptions = {
  name?: string
  implements?: string[]
  abstract?: boolean
  description?: string
  options?: object
}

export const ENTITY_OPTIONS_DEFAULTS: Required<EntityOptions> = {
  name: '',
  implements: [],
  abstract: false,
  description: '',
  options: {},
}

//
// Fields
//

export enum FieldType {
  Id = 'id',
  Uuid = 'uuid',
  Int = 'int',
  Float = 'float',
  String = 'string',
  Date = 'date',
  Boolean = 'boolean',
  Enum = 'enum',
  Set = 'set',
  Created = 'created',
  Updated = 'updated',
  Version = 'version',
  Object = 'object',
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
  | {}

//
// Primary fields
//

export type PrimaryDecorator = (options?: PrimaryOptions) => Function

export type PrimaryOptions = {
  name?: string
  description?: string
  deprecation?: string
  options?: object
}

export const PRIMARY_OPTIONS_DEFAULTS: Required<PrimaryOptions> = {
  name: '',
  description: '',
  deprecation: '',
  options: {},
}

//
// Scalar fields
//

export type ScalarDecorator = (options?: ScalarOptions) => Function

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

export const SCALAR_OPTIONS_DEFAULTS: Required<ScalarOptions> = {
  name: '',
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

// TODO numeric
export type SetOptions = {
  name?: string
  primary?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

export const SET_OPTIONS_DEFAULTS: Required<SetOptions> = {
  name: '',
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
  name?: string
  primary?: boolean
  description?: string
  deprecation?: string
  options?: object
}

export const SPECIAL_OPTIONS_DEFAULTS: Required<SpecialOptions> = {
  name: '',
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
  name?: string
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any
  description?: string
  deprecation?: string
  options?: object
}

export const OBJECT_OPTIONS_DEFAULTS: Required<ObjectOptions> = {
  name: '',
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
