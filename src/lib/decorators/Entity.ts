import {
  EntityDecorator,
  EntityOptions,
  ENTITY_OPTIONS_DEFAULTS,
} from '../../types/decorators'
import { assign } from '../utils'
import { Entity as EntityData } from '../data/Entity'

export const Entity: EntityDecorator = (options: EntityOptions = {}) =>
  //
  ({ name }: any): void =>
    EntityData.add(
      new EntityData(name, assign(ENTITY_OPTIONS_DEFAULTS, options)),
    )
