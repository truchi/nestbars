import {
  FieldType,
  FieldOptions,
  SetOptions,
  RelationOptions,
} from '../../types/decorators'
import { assertNever } from '../utils'

let FIELD_DATA = {}

export const get = (field: Field): any =>
  FIELD_DATA[`${field.entity}:${field.name}`]

export const set = (field: Field, data: any): void =>
  void (FIELD_DATA[`${field.entity}:${field.name}`] = data)

export const reset = (): void => void (FIELD_DATA = {})

export class Field {
  static all: Field[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {}

  relatesTo(): string {
    return this.options instanceof SetOptions
      ? this.options.name
      : this.options instanceof RelationOptions
      ? this.options.withEntity().name
      : ''
  }

  tsType(): string {
    return tsType(this.type, this.relatesTo())
  }

  data(): any {
    return get(this)
  }

  static add(field: Field) {
    Field.all.push(field)
  }
}

const tsType = (type: FieldType, name: string) => {
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
}
