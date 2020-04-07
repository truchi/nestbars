export const data = {}

export type Type =
  | 'int'
  | 'float'
  | 'string'
  | 'date'
  | {
      enum: string[]
      default: string
      name: string
      description?: string
    }

export type EntityArgs = {
  name?: string
  implements?: string[]
  description?: string
}

export type FieldArgs = {
  type?: Type
  primary?: boolean
  manyToOne?: [string, string]
  oneToMany?: [string, string]
}

export const Entity = (args: EntityArgs = {}) =>
  //
  <T extends { new (...args: any[]): {} }>(constructor: T) => {
    const key = constructor.name

    data[key] = data[key] ?? {}
    data[key] = Object.assign({}, data[key], { constructor, args })
  }

export const Field = (args: FieldArgs) =>
  //
  (prototype: any, name: string) => {
    if (typeof prototype === 'function') return

    const key = prototype.constructor.name

    data[key] = data[key] ?? {}
    data[key].fields = data[key].fields ?? []
    data[key].fields.push({ name, args })
  }
