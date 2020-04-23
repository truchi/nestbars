import { PathFunction } from '../../types/utils'
import { SetOptions, RelationOptions } from '../../types/decorators'
import { unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'

export default (entitiesPath: PathFunction, dtosPath: PathFunction) =>
  //
  (type: string, entity: Entity): object => ({
    entityPath: entitiesPath('entity', entity.name),
    createDtoPath: dtosPath('create.dto', entity.name),
    updateDtoPath: dtosPath('update.dto', entity.name),
    dataRelations: unique(
      entity.fields
        .filter(field => field.is(RelationOptions) && field.isData)
        .map(({ relation }) => relation),
    ),
    dataEnums: unique(
      entity
        .by(SetOptions)
        .filter(({ isData }) => isData)
        .map(({ options }) => (options as SetOptions).name),
    ),
  })
