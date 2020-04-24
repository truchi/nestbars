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

    const getDtoPath = dtosPath('get.dto', entity.name)
    const createDtoPath = dtosPath('create.dto', entity.name)
    const updateDtoPath = dtosPath('update.dto', entity.name)

    const primaryFields = entity.fields.filter(field => field.data().isPrimary)
    const dataFields = entity.fields.filter(field => field.data().isData)
    const bothFields = [...primaryFields, ...dataFields]

    const primaryHasInt = has('isGqlInt', primaryFields)
    const primaryHasFloat = has('isGqlFloat', primaryFields)
    const primaryRelations = relations(primaryFields)
    const primaryEnums = enums(primaryFields)

    const bothRelations = relations(bothFields)
    const bothHasInt = has('isGqlInt', bothFields)
    const bothHasFloat = has('isGqlFloat', bothFields)
    const bothEnums = enums(bothFields)

    return {
      ...data,
      getDtoPath,
      createDtoPath,
      updateDtoPath,
      primaryFields,
      dataFields,
      bothFields,
      primaryHasInt,
      primaryHasFloat,
      primaryRelations,
      primaryEnums,
      bothHasInt,
      bothHasFloat,
      bothRelations,
      bothEnums,
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
