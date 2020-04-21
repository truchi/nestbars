import { Class } from './utils'

//
// Entity
//

export type EntityDecorator = (options?: EntityOptions) => Function

export type EntityOptions = {
  name?: string
  description?: string
  options?: object
  // implements?: string[] // TODO
  // abstract?: boolean
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
  | RelationOptions<any>

//
// Scalar fields
//

export type ScalarDecorator = (options?: ScalarOptions) => Function

export class ScalarOptions {
  primary?: boolean
  unique?: boolean
  nullable?: boolean
  default?: any // TODO better type with generic?
  description?: string
  deprecation?: string
  options?: object
}

//
// Primary fields
//

export type PrimaryDecorator = (options?: PrimaryOptions) => Function

export class PrimaryOptions {
  description?: string
  deprecation?: string
  options?: object
}

//
// Special fields
//

export type SpecialDecorator = (options?: SpecialOptions) => Function

export class SpecialOptions {
  primary?: boolean
  description?: string
  deprecation?: string
  options?: object
}

//
// Set fields
//

export type SetDecorator = (
  values: SetOptions['values'],
  name: SetOptions['name'],
  options?: Omit<SetOptions, 'values' | 'name'>,
) => Function

// TODO numeric, imports
export class SetOptions {
  values: string[]
  name: string
  primary?: boolean
  default?: any // TODO string / string[]
  description?: string
  deprecation?: string
  options?: object
}

//
// Relations fields
//

export type OneToOneDecorator<T extends Class> = (
  withEntity: RelationOptions<T>['withEntity'],
  withField: RelationOptions<T>['withField'],
  joinColumn?: RelationOptions<T>['joinColumn'],
) => Function

export type OneToManyDecorator<T extends Class> = (
  withEntity: RelationOptions<T>['withEntity'],
  withField: RelationOptions<T>['withField'],
) => Function

export type ManyToOneDecorator<T extends Class> = (
  withEntity: RelationOptions<T>['withEntity'],
  withField: RelationOptions<T>['withField'],
  joinColumn?: RelationOptions<T>['joinColumn'],
) => Function

export type ManyToManyDecorator<T extends Class> = (
  withEntity: RelationOptions<T>['withEntity'],
  withField: RelationOptions<T>['withField'],
  joinTable?: RelationOptions<T>['joinTable'],
) => Function

export class RelationOptions<T extends Class> {
  withEntity: () => T
  withField: keyof InstanceType<T> // TODO not type checking correctly
  joinColumn?: boolean | object
  joinTable?: boolean | object
  // description?: string // TODO
  // deprecation?: string
}

// TODO description
// TODO options: primary, nullable, cascade, ...
// https://github.com/typeorm/typeorm/blob/a4dec02cc59d3219a29c7be0322af2253e1452dc/src/decorator/options/RelationOptions.ts
