import { EntityDecorator, EntityOptions } from '../../types/decorators'
import { Entity as EntityData } from '../data/Entity'

export const Entity: EntityDecorator = (options: EntityOptions = {}) =>
  //
  ({ name }: any): void => EntityData.add(new EntityData(name, options))
