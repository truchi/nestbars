import { Class } from '../../types/utils'
import {
  FieldType,
  FieldOptions,
  SetValues,
  SetTsName,
  SetOptions,
  ObjectDefinition,
  ObjectOptions,
  RelationWithEntity,
  RelationWithField,
  RelationJoinColumn,
  RelationJoinTable,
} from '../../types/decorators'

export class Field<T extends object> {
  private static fields: Field<FieldOptions>[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: Required<T>,
    readonly type: FieldType,
  ) {}

  static add(field: Field<FieldOptions>) {
    Field.fields.push(field)
  }
}

export class SetField extends Field<SetOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly values: SetValues,
    readonly tsName: SetTsName,
    readonly options: Required<SetOptions>,
    readonly type: FieldType,
  ) {
    super(entity, name, options, type)
  }
}

export class ObjectField extends Field<ObjectOptions> {
  static readonly type: FieldType = FieldType.Object

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly definition: ObjectDefinition,
    readonly options: Required<ObjectOptions>,
  ) {
    super(entity, name, options, ObjectField.type)
  }
}

export class OneToOneField<T extends Class> extends Field<{}> {
  static readonly options: {} = {}
  static readonly type: FieldType = FieldType.OneToOne

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly withEntity: RelationWithEntity<T>,
    readonly withField: RelationWithField<T>,
    readonly joinColumn: RelationJoinColumn,
  ) {
    super(entity, name, OneToOneField.options, OneToOneField.type)
  }
}

export class OneToManyField<T extends Class> extends Field<{}> {
  static readonly options: {} = {}
  static readonly type: FieldType = FieldType.OneToMany

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly withEntity: RelationWithEntity<T>,
    readonly withField: RelationWithField<T>,
  ) {
    super(entity, name, OneToManyField.options, OneToManyField.type)
  }
}

export class ManyToOneField<T extends Class> extends Field<{}> {
  static readonly options: {} = {}
  static readonly type: FieldType = FieldType.ManyToOne

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly withEntity: RelationWithEntity<T>,
    readonly withField: RelationWithField<T>,
    readonly joinColumn: RelationJoinColumn,
  ) {
    super(entity, name, ManyToOneField.options, ManyToOneField.type)
  }
}

export class ManyToManyField<T extends Class> extends Field<{}> {
  static readonly options: {} = {}
  static readonly type: FieldType = FieldType.ManyToMany

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly withEntity: RelationWithEntity<T>,
    readonly withField: RelationWithField<T>,
    readonly joinTable: RelationJoinTable,
  ) {
    super(entity, name, ManyToManyField.options, ManyToManyField.type)
  }
}
