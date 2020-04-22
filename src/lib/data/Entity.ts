import deepFreeze from 'deep-freeze'
import {
  EntityOptions,
  FieldType,
  FieldOptions,
  RelationOptions,
  SetOptions,
} from '../../types/decorators'
import { unique } from '../utils'
import { Field } from './Field'

type Relations = {
  oneToOne: Entity[]
  oneToMany: Entity[]
  manyToOne: Entity[]
  manyToMany: Entity[]
  one: Entity[]
  many: Entity[]
  toOne: Entity[]
  toMany: Entity[]
  all: Entity[]
}

const relations: Relations = {
  oneToOne: [],
  oneToMany: [],
  manyToOne: [],
  manyToMany: [],
  one: [],
  many: [],
  toOne: [],
  toMany: [],
  all: [],
}

let ENTITY_DATA = {}

export const get = (entity: Entity): any => ENTITY_DATA[entity.name]
export const set = (entity: Entity, data: any): void =>
  void (ENTITY_DATA[entity.name] = data)
export const reset = (): void => void (ENTITY_DATA = {})

export class Entity {
  static all: Entity[] = []

  fields: Field[] = []
  enums: Field[] = []
  primaryFields: Field[] = []
  generatedFields: Field[] = []
  dataFields: Field[] = []
  relations: Relations = relations

  constructor(readonly name: string, readonly options: EntityOptions) {}

  async init(): Promise<this> {
    const relations = (...types: (FieldType | (new () => FieldOptions))[]) =>
      unique(this.by(...types).map(({ relation }) => relation))

    this.enums = this.by(SetOptions)
    this.primaryFields = this.fields.filter(({ isPrimary }) => isPrimary)
    this.generatedFields = this.fields.filter(({ isGenerated }) => isGenerated)
    this.dataFields = this.fields.filter(({ isData }) => isData)
    this.relations = {
      oneToOne: relations(FieldType.OneToOne),
      oneToMany: relations(FieldType.OneToMany),
      manyToOne: relations(FieldType.ManyToOne),
      manyToMany: relations(FieldType.ManyToMany),
      one: relations(FieldType.OneToOne, FieldType.OneToMany),
      many: relations(FieldType.ManyToOne, FieldType.ManyToMany),
      toOne: relations(FieldType.OneToOne, FieldType.ManyToOne),
      toMany: relations(FieldType.OneToMany, FieldType.ManyToMany),
      all: relations(RelationOptions),
    }

    return this
  }

  filter(fn: (field: Field) => boolean): Field[] {
    return this.fields.filter(fn)
  }

  by(...args: (FieldType | (new () => FieldOptions))[]): Field[] {
    return this.filter(field => field.is(...args))
  }

  data(): any {
    return get(this)
  }

  static add(entity: Entity) {
    Entity.all.push(entity)
  }

  static find(name: string): Entity {
    return Entity.all.find(entity => entity.name === name)
  }

  static async init() {
    await 0 // Let user modules' circular dependencies resolve

    Field.init()
    Entity.all.map(
      entity => (
        (entity.fields = Field.all.filter(field => field.entity === entity)),
        entity.init()
      ),
    )

    deepFreeze(Entity)
    return Entity.all
  }
}
