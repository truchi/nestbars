import {
  FieldType,
  FieldOptions,
  PrimaryOptions,
  SetOptions,
  SpecialOptions,
  RelationOptions,
} from '../../types/decorators'
import { tsType, dbType, gqlType } from './utils'
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
  relation?: Entity
  enum?: string
  tsType: string
  dbType: string
  gqlType: string
  readonly isPrimary: boolean
  readonly isGenerated: boolean
  readonly isRelation: boolean
  readonly isData: boolean

  constructor(
    readonly _entity: string,
    readonly name: string,
    readonly type: FieldType,
    readonly options: FieldOptions,
  ) {
    this.isPrimary = this.is(PrimaryOptions) || !!(options as any).primary
    this.isGenerated = this.is(PrimaryOptions, SpecialOptions)
    this.isRelation = this.is(RelationOptions)
    this.isData =
      !this.isGenerated &&
      (!this.is(FieldType.OneToOne) ||
        !!(this.options as RelationOptions<any>).joinColumn) &&
      !this.is(FieldType.OneToMany) &&
      (!this.is(FieldType.ManyToMany) ||
        !!(this.options as RelationOptions<any>).joinTable)
  }

  async init(): Promise<this> {
    let name = ''

    if (this.options instanceof SetOptions) {
      this.enum = name = this.options.name
    } else if (this.options instanceof RelationOptions) {
      this.relation = Entity.find((name = this.options.withEntity().name))
    }

    this.entity = Entity.find(this._entity)
    this.tsType = tsType(this.type, name)
    this.dbType = dbType(this.type, name)
    this.gqlType = gqlType(this.type, name)

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
