import { Class } from '../../../types/utils'
import { FieldType } from '../../../types/decorators'

export type Type = {
  type: FieldType
  ts: string
  db: string
  gql: string
  deps: Class[]
}

export const TypeFactory = (type: FieldType, name: string): Type => ({
  type,
  deps: [],
  ts: (() => {
    switch (type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Float:
      case FieldType.Version:
        return 'number'
      case FieldType.String:
      case FieldType.Uuid:
        return 'string'
      case FieldType.Date:
      case FieldType.Created:
      case FieldType.Updated:
        return 'Date'
      case FieldType.Boolean:
        return 'boolean'
      case FieldType.Enum:
      case FieldType.OneToOne:
      case FieldType.ManyToOne:
        return name
      case FieldType.Set:
      case FieldType.OneToMany:
      case FieldType.ManyToMany:
        return `${name}[]`
      default:
        return assertNever(type)
    }
  })(),
  db: (() => {
    switch (type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
        return 'int'
      case FieldType.Float:
        return 'float'
      case FieldType.String:
      case FieldType.Uuid:
        return 'varchar'
      case FieldType.Date:
      case FieldType.Created:
      case FieldType.Updated:
        return 'date'
      case FieldType.Boolean:
        return 'boolean'
      case FieldType.Enum:
        return 'enum'
      case FieldType.Set:
        return 'set'
      case FieldType.OneToOne:
      case FieldType.OneToMany:
      case FieldType.ManyToOne:
      case FieldType.ManyToMany:
        return name
      default:
        return assertNever(type)
    }
  })(),
  gql: (() => {
    switch (type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
        return 'Int'
      case FieldType.Float:
        return 'Float'
      case FieldType.String:
      case FieldType.Uuid:
        return 'String'
      case FieldType.Date:
      case FieldType.Created:
      case FieldType.Updated:
        return 'Date'
      case FieldType.Boolean:
        return 'Boolean'
      case FieldType.Enum:
      case FieldType.OneToOne:
      case FieldType.ManyToOne:
        return name
      case FieldType.Set:
      case FieldType.OneToMany:
      case FieldType.ManyToMany:
        return `[${name}]`
      default:
        return assertNever(type)
    }
  })(),
})

const assertNever = (x: never): never => {
  throw new Error('Missing case for: ' + x)
}
