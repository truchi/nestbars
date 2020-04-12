import { assign } from './utils'
import {
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
} from '../types/decorators'
import { EntityOptions } from './decorators' // TODO

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

const initEntity = (entity: string) =>
  (DATA[entity] = DATA[entity] ?? { fields: {} })
