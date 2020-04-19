import { FieldType, FieldOptions } from '../../types/decorators'

export class Field {
  static all: Field[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {}

  static add(field: Field) {
    Field.all.push(field)
  }
}
