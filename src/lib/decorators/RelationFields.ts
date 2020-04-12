import {
  RelationType,
  RelationEntity,
  RelationField,
  RelationColumn,
  RelationTable,
} from '../../types/decorators'
import { addOneToOne, addOneToMany, addManyToOne, addManyToMany } from '../data'

export const OneToOne = <
  E extends RelationEntity,
  F extends RelationField & keyof InstanceType<E>
>(
  withEntity: E,
  withField: F,
  column: RelationColumn = false,
) => ({ constructor: { name: entity } }: any, field: string): void =>
  addOneToOne(entity, field, withEntity, withField, column)

export const OneToMany = <
  E extends RelationEntity,
  F extends RelationField & keyof InstanceType<E>
>(
  withEntity: E,
  withField: F,
) => ({ constructor: { name: entity } }: any, field: string): void =>
  addOneToMany(entity, field, withEntity, withField)

export const ManyToOne = <
  E extends RelationEntity,
  F extends RelationField & keyof InstanceType<E>
>(
  withEntity: E,
  withField: F,
  column: RelationColumn = false,
) => ({ constructor: { name: entity } }: any, field: string): void =>
  addManyToOne(entity, field, withEntity, withField, column)

export const ManyToMany = <
  E extends RelationEntity,
  F extends RelationField & keyof InstanceType<E>
>(
  withEntity: E,
  withField: F,
  table: RelationTable = false,
) => ({ constructor: { name: entity } }: any, field: string): void =>
  addManyToMany(entity, field, withEntity, withField, table)
