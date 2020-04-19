import { Type, TypeFactory } from './Type'
import { FieldType, FieldOptions } from '../../types/decorators'

export class Field {
  static all: Field[] = []

  public type: Type

  constructor(
    readonly entity: string,
    readonly name: string,
    type: FieldType,
    readonly options: FieldOptions,
  ) {
    this.type = TypeFactory(type, entity)
  }

  static add(field: Field) {
    Field.all.push(field)
  }
}
