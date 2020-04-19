import deepFreeze from 'deep-freeze'
import { EntityOptions, FieldType } from '../../types/decorators'
import { Field } from './Field'

export class Entity {
  static all: Entity[] = []

  dest: string
  templatePath: string
  fields: Field[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {
    this.options.options = this.options.options ?? {}
  }

  fieldsByType(...types: FieldType[]): Field[] {
    return this.fields.filter(({ type }) => types.includes(type))
  }

  static add(entity: Entity) {
    Entity.all.push(entity)
  }

  static find(name: string): Entity | undefined {
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
