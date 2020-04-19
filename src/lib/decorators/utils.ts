import { Class } from '../../types/utils'
import {
  FieldOptions,
  FieldType,
  SetOptions,
  RelationOptions,
  EntityOptions,
} from '../../types/decorators'
import { assign } from '../utils'
import { Field, Entity } from '../data'

export const makeEntityDecoratorFactory = () =>
  //
  (options: EntityOptions = {}) =>
    //
    ({ name }: any): void => Entity.add(new Entity(name, options))

export const makeFieldDecoratorFactory = <Options extends FieldOptions>(
  type: FieldType,
) =>
  //
  (options: Options = {} as Options) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(new Field(entity, name, type, options))

export const makeSetFieldDecoratorFactory = (type: FieldType) =>
  //
  (
    values: SetOptions['values'],
    tsName: SetOptions['name'],
    options: Omit<SetOptions, 'values' | 'name'> = {},
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(
        new Field(
          entity,
          name,
          type,
          assign(options, { values, name: tsName }),
        ),
      )

export const makeRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(
        new Field(entity, name, type, {
          withEntity,
          withField,
        }),
      )

export const makeJoinColumnRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
    joinColumn: RelationOptions<T>['joinColumn'] = false,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(
        new Field(entity, name, type, {
          withEntity,
          withField,
          joinColumn,
        }),
      )

export const makeJoinTableRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
    joinTable: RelationOptions<T>['joinTable'] = false,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      Field.add(
        new Field(entity, name, type, {
          withEntity,
          withField,
          joinTable,
        }),
      )
