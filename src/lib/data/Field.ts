import { FieldType, FieldOptions } from '../../types/decorators'
import { Entity } from './Entity'

let FIELD_DATA = {}

export const get = (field: Field): any =>
  FIELD_DATA[`${field.entity}:${field.name}`]
export const set = (field: Field, data: any): void =>
  void (FIELD_DATA[`${field.entity}:${field.name}`] = data)
export const reset = (): void => void (FIELD_DATA = {})

export class Field {
  static all: Field[] = []
  entity: Entity

  constructor(
    readonly _entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {}

  async init(): Promise<this> {
    this.entity = Entity.find(this._entity)

    return this
  }

  is(...args: (FieldType | (new () => FieldOptions))[]): boolean {
    return args.some(arg =>
      arg instanceof Function //
        ? this.options instanceof arg
        : this.type === arg,
    )
  }

  data(): any {
    return get(this)
  }

  static add(field: Field) {
    Field.all.push(field)
  }

  static init(): void {
    Field.all.map(field => field.init())
  }
}
