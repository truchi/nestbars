import { PathFunction } from '../../types/utils'
import { SetOptions, RelationOptions } from '../../types/decorators'
import { unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import entitiesEntity from '../entities/entity'

export default (entitiesPath: PathFunction, dtosPath: PathFunction) =>
  //
  (type: string, entity: Entity): object => {
    const createDtoPath = dtosPath('create.dto', entity.name)
    const updateDtoPath = dtosPath('update.dto', entity.name)

    const dataRelations = unique(
      entity.fields
        .filter(field => field.is(RelationOptions) && field.data().isData)
        .map(field => field.data().relation),
    )
    const dataEnums = unique(
      entity
        .by(SetOptions)
        .filter(field => field.data().isData)
        .map(({ options }) => (options as SetOptions).name),
    )

    return {
      ...entitiesEntity(entitiesPath)('entity', entity),
      createDtoPath,
      updateDtoPath,
      dataRelations,
      dataEnums,
    }
  }
