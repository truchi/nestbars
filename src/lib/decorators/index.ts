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
// Entity
//

export const Entity: EntityDecorator = makeEntityDecoratorFactory()

//
// Scalar
//

export const Int: ScalarDecorator = makeFieldDecoratorFactory(
  FieldType.Int,
  ScalarOptions,
)

export const Float: ScalarDecorator = makeFieldDecoratorFactory(
  FieldType.Float,
  ScalarOptions,
)

export const String: ScalarDecorator = makeFieldDecoratorFactory(
  FieldType.String,
  ScalarOptions,
)

export const Date: ScalarDecorator = makeFieldDecoratorFactory(
  FieldType.Date,
  ScalarOptions,
)

export const Boolean: ScalarDecorator = makeFieldDecoratorFactory(
  FieldType.Boolean,
  ScalarOptions,
)

//
// Primary
//

export const Id: PrimaryDecorator = makeFieldDecoratorFactory(
  FieldType.Id,
  PrimaryOptions,
)

export const Uuid: PrimaryDecorator = makeFieldDecoratorFactory(
  FieldType.Uuid,
  PrimaryOptions,
)

//
// Special
//

export const Created: SpecialDecorator = makeFieldDecoratorFactory(
  FieldType.Created,
  SpecialOptions,
)

export const Updated: SpecialDecorator = makeFieldDecoratorFactory(
  FieldType.Updated,
  SpecialOptions,
)

export const Version: SpecialDecorator = makeFieldDecoratorFactory(
  FieldType.Version,
  SpecialOptions,
)

//
// Set
//

export const Enum: SetDecorator = makeSetFieldDecoratorFactory(FieldType.Enum)

export const Set: SetDecorator = makeSetFieldDecoratorFactory(FieldType.Set)

//
// Relation
//

export const OneToOne /*: OneToOneDecorator<any>*/ = makeJoinColumnRelationDecoratorFactory(
  FieldType.OneToOne,
)

export const OneToMany /*: OneToManyDecorator<any>*/ = makeRelationDecoratorFactory(
  FieldType.OneToMany,
)

export const ManyToOne /*: ManyToOneDecorator<any>*/ = makeJoinColumnRelationDecoratorFactory(
  FieldType.ManyToOne,
)

export const ManyToMany /*: ManyToManyDecorator<any>*/ = makeJoinTableRelationDecoratorFactory(
  FieldType.ManyToMany,
)
