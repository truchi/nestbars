import { PathFunction } from '../../types/utils'
import { Entity } from '../../lib/data/Entity'

export default (
  entitiesPath: PathFunction,
  dtosPath: PathFunction,
  servicesPath: PathFunction,
) =>
  //
  (type: string, entity: Entity): object => ({
    entityPath: entitiesPath('entity', entity.name),
    getDtoPath: dtosPath('get.dto', entity.name),
    createDtoPath: dtosPath('create.dto', entity.name),
    updateDtoPath: dtosPath('update.dto', entity.name),
    servicePath: servicesPath('service', entity.name),
  })
