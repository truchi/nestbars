import {
  EntityArgs,
  FieldArgs,
  // OneToManyArgs,
  // ManyToOneArgs,
  Class,
} from '../types'
import { addEntity, addField } from './data'

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

// One-to-Many decorator factory
export const OneToMany = <Many extends Class>(
  many: Many,
  toOne: (many: InstanceType<Many>) => any,
) =>
  // One-to-Many decorator
  ({ constructor }, field: string) =>
    console.log(constructor.name, field, many, toOne)

// Many-to-One decorator factory
export const ManyToOne = <One extends Class>(
  //
  one: One,
  toMany: (one: InstanceType<One>) => any[],
) =>
  // One-to-Many decorator
  ({ constructor }, field: string) =>
    console.log(constructor.name, field, one, toMany)
