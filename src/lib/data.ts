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
    entity?: string
    options?: Required<EntityOptions>
    fields: {
      [key: string]: {
        entity: string
        field: string
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
  entity: string,
  options: Required<EntityOptions>,
): void => void (DATA[entity] = assign(DATA[entity], { entity, options }))

export const addPrimary = (
  entity: string,
  field: string,
  type: PrimaryType,
  options: Required<PrimaryOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = { entity, field, type, options }))

export const addScalar = (
  entity: string,
  field: string,
  type: ScalarType,
  options: Required<ScalarOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = { entity, field, type, options }))

export const addSet = (
  entity: string,
  field: string,
  type: SetType,
  values: SetValues,
  tsName: SetTsName,
  options: Required<SetOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = {
    entity,
    field,
    type,
    values,
    tsName,
    options,
  }))

export const addSpecial = (
  entity: string,
  field: string,
  type: SpecialType,
  options: Required<SpecialOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = { entity, field, type, options }))

export const addObject = (
  entity: string,
  field: string,
  type: ObjectType,
  definition: ObjectDefinition,
  options: Required<ObjectOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = { entity, field, type, definition, options }))

export const addOneToOne = (
  entity: string,
  field: string,
  withEntity: RelationEntity,
  withField: RelationField,
  column: RelationColumn,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = {
    entity,
    field,
    type: RelationType.OneToOne,
    withEntity,
    withField,
    column,
  }))

export const addOneToMany = (
  entity: string,
  field: string,
  withEntity: RelationEntity,
  withField: RelationField,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = {
    entity,
    field,
    type: RelationType.OneToMany,
    withEntity,
    withField,
  }))

export const addManyToOne = (
  entity: string,
  field: string,
  withEntity: RelationEntity,
  withField: RelationField,
  column: RelationColumn,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = {
    entity,
    field,
    type: RelationType.ManyToOne,
    withEntity,
    withField,
    column,
  }))

export const addManyToMany = (
  entity: string,
  field: string,
  withEntity: RelationEntity,
  withField: RelationField,
  table: RelationTable,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = {
    entity,
    field,
    type: RelationType.ManyToMany,
    withEntity,
    withField,
    table,
  }))

const initEntity = (entity: string) =>
  (DATA[entity] = DATA[entity] ?? { fields: {} })
