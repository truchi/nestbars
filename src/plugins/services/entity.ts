import { PathFunction } from '../../types/utils'
import { Entity } from '../../lib/data/Entity'

export default (entitiesPath: PathFunction, servicesPath: PathFunction) =>
  //
  (type: string, entity: Entity): object => ({
    entityPath: entitiesPath('entity', entity.name),
    servicePath: servicesPath('service', entity.name),
  })
