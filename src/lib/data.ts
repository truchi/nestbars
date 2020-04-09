import { EntityArgs, FieldArgs, Data } from '../types'

// Object containing info
// about decorated classes
export const DATA: Data = {}

export const addEntity = (entity: string, args?: EntityArgs): void =>
  void (DATA[entity] = Object.assign(
    {},
    DATA[entity],
    args ? { entity, args } : {},
  ))

export const addField = (
  entity: string,
  field: string,
  args: FieldArgs,
): void =>
  void (
    //
    (addEntity(entity),
    (DATA[entity].fields = Object.assign({}, DATA[entity].fields, {
      [field]: { field, args },
    })))
  )
