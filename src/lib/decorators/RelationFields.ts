import {
  OneToOneDecorator,
  OneToManyDecorator,
  ManyToOneDecorator,
  ManyToManyDecorator,
  RelationWithEntity,
  RelationWithField,
  RelationJoinColumn,
  RelationJoinTable,
} from '../../types/decorators'
import {
  OneToOneField,
  OneToManyField,
  ManyToOneField,
  ManyToManyField,
} from '../data/Field'

export const OneToOne: OneToOneDecorator =
  //
  (
    withEntity: RelationWithEntity,
    withField: RelationWithField,
    joinColumn?: RelationJoinColumn,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      OneToOneField.add(
        new OneToOneField(entity, name, withEntity, withField, joinColumn),
      )

export const OneToMany: OneToManyDecorator =
  //
  (withEntity: RelationWithEntity, withField: RelationWithField) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      OneToManyField.add(
        new OneToManyField(entity, name, withEntity, withField),
      )

export const ManyToOne: ManyToOneDecorator =
  //
  (
    withEntity: RelationWithEntity,
    withField: RelationWithField,
    joinColumn?: RelationJoinColumn,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ManyToOneField.add(
        new ManyToOneField(entity, name, withEntity, withField, joinColumn),
      )

export const ManyToMany: ManyToManyDecorator =
  //
  (
    withEntity: RelationWithEntity,
    withField: RelationWithField,
    joinTable?: RelationJoinTable,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ManyToManyField.add(
        new ManyToManyField(entity, name, withEntity, withField, joinTable),
      )
