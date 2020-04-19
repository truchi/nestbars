import { FieldType, FieldOptions } from '../../types/decorators'
import { Data } from './Data'

export const FIELD_DATA = new Data()

export class Field {
  static all: Field[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {}

  data(): any {
    return FIELD_DATA.get(`${this.entity}:${this.name}`)
  }

  static add(field: Field) {
    Field.all.push(field)
  }
}
