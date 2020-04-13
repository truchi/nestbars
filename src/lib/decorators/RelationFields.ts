import { Class } from '../../types/utils'
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

export const OneToOne /*: OneToOneDecorator<...> */ =
  //
  <T extends Class>(
    withEntity: RelationWithEntity<T>,
    withField: RelationWithField<T>,
    joinColumn?: RelationJoinColumn,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      OneToOneField.add(
        new OneToOneField(entity, name, withEntity, withField, joinColumn),
      )

export const OneToMany /*: OneToManyDecorator<...> */ =
  //
  <T extends Class>(
    withEntity: RelationWithEntity<T>,
    withField: RelationWithField<T>,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      OneToManyField.add(
        new OneToManyField(entity, name, withEntity, withField),
      )

export const ManyToOne /*: ManyToOneDecorator<...> */ =
  //
  <T extends Class>(
    withEntity: RelationWithEntity<T>,
    withField: RelationWithField<T>,
    joinColumn?: RelationJoinColumn,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ManyToOneField.add(
        new ManyToOneField(entity, name, withEntity, withField, joinColumn),
      )

export const ManyToMany /*: ManyToManyDecorator<...> */ =
  //
  <T extends Class>(
    withEntity: RelationWithEntity<T>,
    withField: RelationWithField<T>,
    joinTable?: RelationJoinTable,
  ) =>
    //
    ({ constructor: { name: entity } }: any, name: string): void =>
      ManyToManyField.add(
        new ManyToManyField(entity, name, withEntity, withField, joinTable),
      )
