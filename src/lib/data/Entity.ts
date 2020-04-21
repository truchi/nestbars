import deepFreeze from 'deep-freeze'
import {
  EntityOptions,
  FieldType,
  FieldOptions,
  RelationOptions,
} from '../../types/decorators'
import { unique } from '../utils'
import { Field } from './Field'

let ENTITY_DATA = {}

export const get = (entity: Entity): any => ENTITY_DATA[entity.name]
export const set = (entity: Entity, data: any): void =>
  void (ENTITY_DATA[entity.name] = data)
export const reset = (): void => void (ENTITY_DATA = {})

export class Entity {
  static all: Entity[] = []

  fields: Field[] = []
  relations: Entity[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {
    this.fields = Field.all.map(field => ((field.entity = this), field))
    Field.all = []
  }

  async init(): Promise<this> {
    this.relations = unique(
      this.fields.map(({ relation }) => relation).filter(x => x),
    )

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

    await Promise.all(
      Entity.all.map(
        async entity => (
          await Promise.all(
            entity.fields.map(async field => await field.init()),
          ),
          await entity.init()
        ),
      ),
    )

    deepFreeze(Entity)
    console.log(Entity.all)
    return Entity.all
  }
}
