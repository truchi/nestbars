import { FieldType } from '../../../types/decorators'
import { assertNever } from '../../../lib/utils'
import { Field } from '../../../lib/data/Field'

type Types = {
  tsType: string
  dbType: string
  gqlType: string
}

export default ({ type }: Field, name: string): Types => ({
  tsType: (() => {
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
        return name
      case FieldType.OneToOne:
      case FieldType.ManyToOne:
        return name
      case FieldType.Set:
      case FieldType.OneToMany:
      case FieldType.ManyToMany:
        return `${name}[]`
      default:
        return assertNever(type, __filename, 'tsType')
    }
  })(),
  dbType: (() => {
    switch (type) {
      case FieldType.Uuid:
        return 'uuid'
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
        return 'int'
      case FieldType.Float:
        return 'float'
      case FieldType.String:
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
        return assertNever(type, __filename, 'dbType')
    }
  })(),
  gqlType: (() => {
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
        return assertNever(type, __filename, 'gqlType')
    }
  })(),
})
