import { PathFunction } from '../../types/utils'
import { FieldType } from '../../types/decorators'
import { Entity } from '../../lib/data/Entity'

export default (
  entitiesPath: PathFunction,
  servicesPath: PathFunction,
  resolversPath: PathFunction,
) =>
  //
  (entity: Entity): object => ({
    entityPath: entitiesPath('entity', entity.name),
    servicePath: servicesPath('service', entity.name),
    resolverPath: resolversPath('resolver', entity.name),
    hasInt: !!entity.by(FieldType.Int).length,
    hasFloat: !!entity.by(FieldType.Float).length,
  })
