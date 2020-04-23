import deepFreeze from 'deep-freeze'
import { EntityOptions, FieldType, FieldOptions } from '../../types/decorators'
import { Field } from './Field'

let ENTITY_DATA = {}

export const get = (entity: Entity): any => ENTITY_DATA[entity.name]
export const set = (entity: Entity, data: any): void =>
  void (ENTITY_DATA[entity.name] = data)
export const reset = (): void => void (ENTITY_DATA = {})

export class Entity {
  static all: Entity[] = []
  fields: Field[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {}

  by(...args: (FieldType | (new () => FieldOptions))[]): Field[] {
    return this.fields.filter(field => field.is(...args))
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
    Entity.all.forEach(
      entity =>
        (entity.fields = Field.all.filter(field => field.entity === entity)),
    )

    deepFreeze(Entity)
    return Entity.all
  }
}
