import {
  EntityDecorator,
  ScalarDecorator,
  FieldType,
  PrimaryDecorator,
  SpecialDecorator,
  ScalarOptions,
  PrimaryOptions,
  SpecialOptions,
  SetDecorator,
  OneToOneDecorator,
  OneToManyDecorator,
  ManyToOneDecorator,
  ManyToManyDecorator,
} from '../../types/decorators'
import {
  makeFieldDecoratorFactory,
  makeSetFieldDecoratorFactory,
  makeRelationDecoratorFactory,
  makeJoinColumnRelationDecoratorFactory,
  makeJoinTableRelationDecoratorFactory,
  makeEntityDecoratorFactory,
} from './utils'

//
// Utils
//

//
// Entity
//

export const Entity: EntityDecorator =
  //
  makeEntityDecoratorFactory()

//
// Scalar
//

export const Int: ScalarDecorator =
  //
  makeFieldDecoratorFactory<ScalarOptions>(FieldType.Int)

export const Float: ScalarDecorator =
  //
  makeFieldDecoratorFactory<ScalarOptions>(FieldType.Float)

export const String: ScalarDecorator =
  //
  makeFieldDecoratorFactory<ScalarOptions>(FieldType.String)

export const Date: ScalarDecorator =
  //
  makeFieldDecoratorFactory<ScalarOptions>(FieldType.Date)

export const Boolean: ScalarDecorator =
  //
  makeFieldDecoratorFactory<ScalarOptions>(FieldType.Boolean)

//
// Primary
//

export const Id: PrimaryDecorator =
  //
  makeFieldDecoratorFactory<PrimaryOptions>(FieldType.Id)

export const Uuid: PrimaryDecorator =
  //
  makeFieldDecoratorFactory<PrimaryOptions>(FieldType.Uuid)

//
// Special
//

export const Created: SpecialDecorator =
  //
  makeFieldDecoratorFactory<SpecialOptions>(FieldType.Created)

export const Updated: SpecialDecorator =
  //
  makeFieldDecoratorFactory<SpecialOptions>(FieldType.Updated)

export const Version: SpecialDecorator =
  //
  makeFieldDecoratorFactory<SpecialOptions>(FieldType.Version)

//
// Set
//

export const Enum: SetDecorator =
  //
  makeSetFieldDecoratorFactory(FieldType.Enum)

export const Set: SetDecorator =
  //
  makeSetFieldDecoratorFactory(FieldType.Set)

//
// Relation
//

export const OneToOne: OneToOneDecorator<any> =
  //
  makeJoinColumnRelationDecoratorFactory(FieldType.OneToOne)

export const OneToMany: OneToManyDecorator<any> =
  //
  makeRelationDecoratorFactory(FieldType.OneToMany)

export const ManyToOne: ManyToOneDecorator<any> =
  //
  makeJoinColumnRelationDecoratorFactory(FieldType.ManyToOne)

export const ManyToMany: ManyToManyDecorator<any> =
  //
  makeJoinTableRelationDecoratorFactory(FieldType.ManyToMany)
