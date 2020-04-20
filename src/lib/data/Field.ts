import {
  FieldType,
  FieldOptions,
  SetOptions,
  RelationOptions,
} from '../../types/decorators'
import { tsType, dbType, gqlType } from './utils'

let FIELD_DATA = {}

export const get = (field: Field): any =>
  FIELD_DATA[`${field.entity}:${field.name}`]
export const set = (field: Field, data: any): void =>
  void (FIELD_DATA[`${field.entity}:${field.name}`] = data)
export const reset = (): void => void (FIELD_DATA = {})

export class Field {
  static all: Field[] = []

  tsType: string
  dbType: string
  gqlType: string

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {}

  async init(): Promise<this> {
    await 0 // Avoids circular dependencies undefineds

    const name =
      this.options instanceof SetOptions
        ? this.options.name
        : this.options instanceof RelationOptions
        ? this.options.withEntity().name
        : ''

    this.tsType = tsType(this.type, name)
    this.dbType = dbType(this.type, name)
    this.gqlType = gqlType(this.type, name)

    return this
  }

  data(): any {
    return get(this)
  }

  static add(field: Field) {
    Field.all.push(field)
  }
}
