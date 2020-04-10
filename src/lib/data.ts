import { assign } from './utils'
import { EntityOptions, IdOptions } from './decorators'

export type Data = {
  [key: string]: {
    entity?: string
    options?: Required<EntityOptions>
    fields?: {
      [key: string]: {
        entity: string
        field: string
        options: Required<IdOptions>
      }
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

export const addId = (
  entity: string,
  field: string,
  options: Required<IdOptions>,
): void =>
  void (initEntity(entity),
  (DATA[entity].fields[field] = { entity, field, options }))

// export const addField = (
//   entity: string,
//   field: string,
//   args: FieldOptions,
// ): void =>
//   void (
//     //
//     (addEntity(entity),
//     (DATA[entity].fields = Object.assign({}, DATA[entity].fields, {
//       [field]: { field, args },
//     })))
//   )

// export const addOneToMany = (
//   entity: string,
//   field: string,
//   many: string,
//   toOne: () => any,
// ) => 0

const initEntity = (entity: string) =>
  (DATA.entities[entity] = DATA.entities[entity] ?? {})
