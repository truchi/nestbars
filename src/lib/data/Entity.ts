import deepFreeze from 'deep-freeze'
import {
  EntityOptions,
  FieldType,
  RelationOptions,
} from '../../types/decorators'
import { Class } from '../../types/utils'
import { unique, uniqueBy } from '../utils'
import { Field } from './Field'

let ENTITY_DATA = {}

export const get = (entity: Entity): any => ENTITY_DATA[entity.name]

export const set = (entity: Entity, data: any): void =>
  void (ENTITY_DATA[entity.name] = data)

export const reset = (): void => void (ENTITY_DATA = {})

export class Entity {
  static all: Entity[] = []

  fields: Field[] = []
  dependencies: Entity[] = []

  constructor(readonly name: string, readonly options: EntityOptions) {
    this.options.options = this.options.options ?? {}
  }

  async init(): Promise<this> {
    await 0 // Avoids circular dependencies undefineds

    this.dependencies = unique(
      this.byType(
        FieldType.OneToOne,
        FieldType.OneToMany,
        FieldType.ManyToOne,
        FieldType.ManyToMany,
      ).map(field => (field.options as RelationOptions<any>).withEntity().name),
    ).map(Entity.find)

    return this
  }

  filter(fn: (field: Field) => boolean): Field[] {
    return this.fields.filter(fn)
  }

  byType(...types: FieldType[]): Field[] {
    return this.filter(({ type }) => types.includes(type))
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
    const map = Entity.all.reduce(
      (map, entity) => ({
        ...map,
        [entity.name]: entity,
      }),
      {},
    )

    await Promise.all(
      Field.all.map(async field =>
        map[field.entity].fields.push(await field.init()),
      ),
    )

    await Promise.all(Entity.all.map(async entity => await entity.init()))
    deepFreeze(Entity)

    return Entity.all
  }
}
