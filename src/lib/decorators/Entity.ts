import { EntityOptions } from '../../types/decorators'
import { assign } from '../utils'
import { addEntity } from '../data'

const DEFAULTS: Required<EntityOptions> = {
  name: '',
  implements: [],
  abstract: false,
  description: '',
}

export const Entity = (options: EntityOptions = {}) =>
  //
  ({ name: entity }: any): void => addEntity(entity, assign(DEFAULTS, options))
