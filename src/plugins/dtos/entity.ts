import { PathFunction } from '../../types/utils'
import { SetOptions, RelationOptions } from '../../types/decorators'
import { unique } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import entitiesEntityData from '../entities/entity'

export default (entitiesPath: PathFunction, dtosPath: PathFunction) =>
  //
  (type: string, entity: Entity): object => {
    const data = entitiesEntityData(entitiesPath)('entity', entity)

    const createDtoPath = dtosPath('create.dto', entity.name)
    const updateDtoPath = dtosPath('update.dto', entity.name)

    const createFields = entity.fields.filter(field => field.data().isData)
    const updateFields = [
      ...entity.fields.filter(field => field.data().isPrimary),
      ...createFields,
    ]
    const createHasInt = has('isGqlInt', createFields)
    const createHasFloat = has('isGqlFloat', createFields)
    const updateHasInt = has('isGqlInt', updateFields)
    const updateHasFloat = has('isGqlFloat', updateFields)
    const createRelations = relations(createFields)
    const updateRelations = relations(updateFields)
    const createEnums = enums(createFields)
    const updateEnums = enums(updateFields)

    return {
      ...data,
      createDtoPath,
      updateDtoPath,
      createFields,
      updateFields,
      createHasInt,
      createHasFloat,
      updateHasInt,
      updateHasFloat,
      createRelations,
      updateRelations,
      createEnums,
      updateEnums,
    }
  }

const relations = (fields: Field[]) =>
  unique(
    fields
      .filter(field => field.is(RelationOptions))
      .map(field => field.data().relation),
  )
const enums = (fields: Field[]) =>
  unique(
    fields
      .filter(field => field.is(SetOptions))
      .map(({ options }) => (options as SetOptions).name),
  )
const has = (type: 'isGqlInt' | 'isGqlFloat', fields: Field[]): boolean =>
  !!fields.filter(field => field.data()[type]).length
