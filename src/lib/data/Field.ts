import { FieldType, FieldOptions } from '../../types/decorators'

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

  data(): any {
    return get(this)
  }

  static add(field: Field) {
    Field.all.push(field)
  }
}
