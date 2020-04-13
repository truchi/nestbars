import { EntityOptions, FieldOptions } from '../../types/decorators'
import { Field } from './Field'

export class Entity {
  static entities: Entity[] = []
  fields: Field<FieldOptions>[] = []

  constructor(
    readonly name: string,
    readonly options: Required<EntityOptions>,
  ) {}

  static add(entity: Entity) {
    Entity.entities.push(entity)
  }
}
