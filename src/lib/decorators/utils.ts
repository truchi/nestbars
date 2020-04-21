import { Class } from '../../types/utils'
import {
  FieldType,
  SetOptions,
  RelationOptions,
  EntityOptions,
} from '../../types/decorators'
import { Entity } from '../data/Entity'
import { Field } from '../data/Field'

export const makeEntityDecoratorFactory = () =>
  //
  (options: EntityOptions = {}) =>
    //
    ({ name }: any): void => Entity.add(new Entity(name, options))

export const makeFieldDecoratorFactory = (
  type: FieldType,
  OptionsClass: Class,
) =>
  //
  (options: InstanceType<Class> = {}) =>
    //
    (_: any, name: string): void =>
      Field.add(
        new Field(name, type, Object.assign(new OptionsClass(), options)),
      )

export const makeSetFieldDecoratorFactory = (type: FieldType) =>
  //
  (
    values: SetOptions['values'],
    tsName: SetOptions['name'],
    options: Omit<SetOptions, 'values' | 'name'> = {},
  ) =>
    //
    (_: any, name: string): void =>
      Field.add(
        new Field(
          name,
          type,
          Object.assign(new SetOptions(), options, { values, name: tsName }),
        ),
      )

export const makeRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
  ) =>
    //
    (_: any, name: string): void =>
      Field.add(
        new Field(
          name,
          type,
          Object.assign(new RelationOptions(), {
            withEntity,
            withField,
          }),
        ),
      )

export const makeJoinColumnRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
    joinColumn: RelationOptions<T>['joinColumn'] = false,
  ) =>
    //
    (_: any, name: string): void =>
      Field.add(
        new Field(
          name,
          type,
          Object.assign(new RelationOptions(), {
            withEntity,
            withField,
            joinColumn,
          }),
        ),
      )

export const makeJoinTableRelationDecoratorFactory = (type: FieldType) =>
  //
  <T extends Class>(
    withEntity: RelationOptions<T>['withEntity'],
    withField: RelationOptions<T>['withField'],
    joinTable: RelationOptions<T>['joinTable'] = false,
  ) =>
    //
    (_: any, name: string): void =>
      Field.add(
        new Field(
          name,
          type,
          Object.assign(new RelationOptions(), {
            withEntity,
            withField,
            joinTable,
          }),
        ),
      )
