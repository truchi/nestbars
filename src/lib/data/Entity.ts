import deepFreeze from 'deep-freeze'
import { EntityOptions, FieldType } from '../../types/decorators'
import { Field } from './Field'

let ENTITY_DATA = {}
export const get = (entity: Entity): any => ENTITY_DATA[entity.name]
export const set = (entity: Entity, data: any): void =>
  void (ENTITY_DATA[entity.name] = data)
export const empty = (): void => void (ENTITY_DATA = {})

export class Entity {
  static all: Entity[] = []

  fields: Field[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {
    this.options.options = this.options.options ?? {}
  }

  fieldsByType(...types: FieldType[]): Field[] {
    return this.fields.filter(({ type }) => types.includes(type))
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

  static init() {
    const map = Entity.all.reduce(
      (map, entity) => ({
        ...map,
        [entity.name]: entity,
      }),
      {},
    )

    Field.all.map(field => map[field.entity].fields.push(field))

    deepFreeze(Entity)
    return Entity.all
  }
}
