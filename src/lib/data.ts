import { assign } from './utils'
import {
  EntityOptions,
  PrimaryType,
  PrimaryOptions,
  ScalarType,
  ScalarOptions,
  SetType,
  SetValues,
  SetTsName,
  SetOptions,
  SpecialType,
  SpecialOptions,
  ObjectType,
  ObjectDefinition,
  ObjectOptions,
  RelationType,
  RelationEntity,
  RelationField,
  RelationColumn,
  RelationTable,
} from '../types/decorators'

export type Data = {
  [key: string]: {
    name: string
    options: Required<EntityOptions>
    fields: {
      [key: string]: {
        entity: string
        name: string
      } & (
        | {
            type: PrimaryType
            options: Required<PrimaryOptions>
          }
        | {
            type: ScalarType
            options: Required<ScalarOptions>
          }
        | {
            type: SetType
            values: SetValues
            tsName: SetTsName
            options: Required<SetOptions>
          }
        | {
            type: SpecialType
            options: Required<SpecialOptions>
          }
        | {
            type: ObjectType
            definition: ObjectDefinition
            options: Required<ObjectOptions>
          }
        | {
            type: RelationType.OneToOne
            withEntity: RelationEntity
            withField: RelationField
            column: RelationColumn
          }
        | {
            type: RelationType.OneToMany
            withEntity: RelationEntity
            withField: RelationField
          }
        | {
            type: RelationType.ManyToOne
            withEntity: RelationEntity
            withField: RelationField
            column: RelationColumn
          }
        | {
            type: RelationType.ManyToMany
            withEntity: RelationEntity
            withField: RelationField
            table: RelationTable
          }
      )
    }
  }
}

// Object containing info
// about decorated classes
export const DATA: Data = {}

export const addEntity = (
  name: string,
  options: Required<EntityOptions>,
): void => void (DATA[name] = assign(DATA[name], { name, options }))

export const addPrimary = (
  entity: string,
  name: string,
  type: PrimaryType,
  options: Required<PrimaryOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = { entity, name, type, options }))

export const addScalar = (
  entity: string,
  name: string,
  type: ScalarType,
  options: Required<ScalarOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = { entity, name, type, options }))

export const addSet = (
  entity: string,
  name: string,
  type: SetType,
  values: SetValues,
  tsName: SetTsName,
  options: Required<SetOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = {
    entity,
    name,
    type,
    values,
    tsName,
    options,
  }))

export const addSpecial = (
  entity: string,
  name: string,
  type: SpecialType,
  options: Required<SpecialOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = { entity, name, type, options }))

export const addObject = (
  entity: string,
  name: string,
  type: ObjectType,
  definition: ObjectDefinition,
  options: Required<ObjectOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = { entity, name, type, definition, options }))

export const addOneToOne = (
  entity: string,
  name: string,
  withEntity: RelationEntity,
  withField: RelationField,
  column: RelationColumn,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = {
    entity,
    name,
    type: RelationType.OneToOne,
    withEntity,
    withField,
    column,
  }))

export const addOneToMany = (
  entity: string,
  name: string,
  withEntity: RelationEntity,
  withField: RelationField,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = {
    entity,
    name,
    type: RelationType.OneToMany,
    withEntity,
    withField,
  }))

export const addManyToOne = (
  entity: string,
  name: string,
  withEntity: RelationEntity,
  withField: RelationField,
  column: RelationColumn,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = {
    entity,
    name,
    type: RelationType.ManyToOne,
    withEntity,
    withField,
    column,
  }))

export const addManyToMany = (
  entity: string,
  name: string,
  withEntity: RelationEntity,
  withField: RelationField,
  table: RelationTable,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[name] = {
    entity,
    name,
    type: RelationType.ManyToMany,
    withEntity,
    withField,
    table,
  }))

const initEntity = (name: string) =>
  (DATA[name] = DATA[name] ?? {
    name,
    options: {} as Required<EntityOptions>,
    fields: {},
  })
