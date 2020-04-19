import { PathFunction } from '../../types/utils'
import { Entity } from '../../lib/data/Entity'
import { EntityData } from './lib/EntityData'

export default (entities: Entity[], dest: PathFunction) =>
  //
  () =>
    entities.map(entity => new EntityData(entity, dest('entity', entity.name)))
