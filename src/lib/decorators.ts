import { EntityArgs } from './types/EntityArgs'
import { FieldArgs } from './types/FieldArgs'

export type Data = {
  [key: string]: {
    entity: string
    args: EntityArgs
    fields: {
      [key: string]: {
        field: string
        args: FieldArgs
      }
    }
  }
}

// Object containing info
// about decorated classes
export const data: Data = {}

const addEntity = (entity: string, args?: EntityArgs): void =>
  void (data[entity] = Object.assign(
    {},
    data[entity],
    args ? { entity, args } : {},
  ))

const addField = (entity: string, field: string, args: FieldArgs): void =>
  void (
    //
    (addEntity(entity),
    (data[entity].fields = Object.assign({}, data[entity].fields, {
      [field]: { field, args },
    })))
  )

// Entity decorator factory
export const Entity = (args: EntityArgs = {}) =>
  // Entity decorator
  <T extends { new (...args: any[]): {} }>(constructor: T): void =>
    addEntity(constructor.name, args)

// Field decorator factory
export const Field = (args: FieldArgs) =>
  // Field decorator
  (prototype: any, field: string) => {
    // Ignore static properties
    if (typeof prototype === 'function') return

    addField(prototype.constructor.name, field, args)
  }
