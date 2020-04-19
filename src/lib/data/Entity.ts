import deepFreeze from 'deep-freeze'
import { EntityOptions, FieldType } from '../../types/decorators'
import { Data } from './Data'
import { Field } from './Field'

export const ENTITY_DATA = new Data()

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
    return ENTITY_DATA.get(this.name)
  }

  static add(entity: Entity) {
    Entity.all.push(entity)
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
