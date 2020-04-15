import { Class } from '../../types/utils'
import { assign } from '../utils'
import {
  FieldType,
  FieldOptions,
  SetValues,
  SetTsName,
  SetOptions,
  RelationWithEntity,
  RelationWithField,
  RelationJoinColumn,
  RelationJoinTable,
  PrimaryOptions,
  ScalarOptions,
  SpecialOptions,
} from '../../types/decorators'

export class Field<T extends FieldOptions> {
  static all: Field<FieldOptions>[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: T,
    readonly type: FieldType,
  ) {}

  tsType(): string {
    switch (this.type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
      case FieldType.Float:
        return 'number'
      case FieldType.Uuid:
      case FieldType.String:
        return 'string'
      case FieldType.Created:
      case FieldType.Updated:
      case FieldType.Date:
        return 'Date'
      case FieldType.Boolean:
        return 'boolean'
    }
  }

  dbType(): string {
    switch (this.type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
      case FieldType.Float:
        return 'int'
      case FieldType.Uuid:
      case FieldType.String:
        return 'varchar'
      case FieldType.Created:
      case FieldType.Updated:
      case FieldType.Date:
        return 'date'
      case FieldType.Boolean:
        return 'boolean'
      case FieldType.Enum:
        return 'enum'
      case FieldType.Set:
        return 'set'
    }
  }

  gqlType(): string {
    switch (this.type) {
      case FieldType.Id:
      case FieldType.Int:
      case FieldType.Version:
        return 'Int'
      case FieldType.Float:
        return 'Float'
      case FieldType.Uuid:
      case FieldType.String:
        return 'String'
      case FieldType.Created:
      case FieldType.Updated:
      case FieldType.Date:
        return 'Date'
      case FieldType.Boolean:
        return 'Boolean'
    }
  }

  dependencies(): string[] {
    return []
  }

  dbOptions(): object {
    return { type: this.dbType() }
  }

  gqlOptions(): object {
    return {}
  }

  static add(field: Field<FieldOptions>) {
    Field.all.push(field)
  }
}

export class PrimaryField extends Field<PrimaryOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: PrimaryOptions,
    readonly type: FieldType.Id | FieldType.Uuid,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { description },
    } = this

    return assign(
      super.dbOptions(),
      { type: undefined },
      { comment: description },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}

export class ScalarField extends Field<ScalarOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: ScalarOptions,
    readonly type:
      | FieldType.Int
      | FieldType.Float
      | FieldType.String
      | FieldType.Date
      | FieldType.Boolean,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { primary, unique, nullable, default: dflt, description },
    } = this

    return assign(
      super.dbOptions(),
      {
        primary,
        unique,
        nullable,
        default: dflt,
        comment: description,
      },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { nullable, default: dflt, description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        nullable,
        defaultValue: dflt,
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}

export class SetField extends Field<SetOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly values: SetValues,
    readonly tsName: SetTsName,
    readonly options: SetOptions,
    readonly type: FieldType.Enum | FieldType.Set,
  ) {
    super(entity, name, options, type)
  }

  tsType(): string {
    return this.type === FieldType.Enum ? this.tsName : this.tsName + '[]'
  }

  gqlType(): string {
    return this.type === FieldType.Enum ? this.tsName : '[' + this.tsName + ']'
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      tsName,
      options: { primary, default: dflt, description },
    } = this

    return assign(
      super.dbOptions(),
      {
        primary,
        enum: tsName,
        default: dflt,
        comment: description || undefined,
      },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { default: dflt, description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        defaultValue: dflt,
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
  }
}

export class SpecialField extends Field<SpecialOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: SpecialOptions,
    readonly type: FieldType.Created | FieldType.Updated | FieldType.Version,
  ) {
    super(entity, name, options, type)
  }

  dbOptions(): object {
    // TODO deprecation?
    const {
      options: { primary, description },
    } = this

    return assign(
      super.dbOptions(),
      { primary, comment: description },
      this.options.options,
    )
  }

  gqlOptions(): object {
    const {
      options: { description, deprecation },
    } = this

    return assign(
      super.gqlOptions(),
      {
        description,
        deprecationReason: deprecation,
      },
      this.options.options,
    )
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

  tsType(): string {
    return this.withEntity().name
  }

  dbType(): string {
    return this.withEntity().name
  }

  gqlType(): string {
    return this.withEntity().name
  }

  dependencies(): string[] {
    return [this.withEntity().name]
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

  tsType(): string {
    return this.withEntity().name + '[]'
  }

  dbType(): string {
    return this.withEntity().name
  }

  gqlType(): string {
    return '[' + this.withEntity().name + ']'
  }

  dependencies(): string[] {
    return [this.withEntity().name]
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

  tsType(): string {
    return this.withEntity().name
  }

  dbType(): string {
    return this.withEntity().name
  }

  gqlType(): string {
    return this.withEntity().name
  }

  dependencies(): string[] {
    return [this.withEntity().name]
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

  tsType(): string {
    return this.withEntity().name + '[]'
  }

  dbType(): string {
    return this.withEntity().name
  }

  gqlType(): string {
    return '[' + this.withEntity().name + ']'
  }

  dependencies(): string[] {
    return [this.withEntity().name]
  }
}
