import { Class } from '../../types/utils'
import {
  flat,
  unique,
  defined,
  objectDefinitionRecursion,
  assign,
} from '../utils'
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
  PrimaryOptions,
  ScalarOptions,
  SpecialOptions,
} from '../../types/decorators'

export class Field<T extends FieldOptions> {
  static all: Field<FieldOptions>[] = []

  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: Required<T>,
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

    throw new Error() // TODO
  }

  dbType(): string | undefined {
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
      case FieldType.Object:
        return 'simple-json'
    }

    return undefined
  }

  dependencies(): string[] {
    return []
  }

  columnOptions(): object {
    return { type: this.dbType() }
  }

  static add(field: Field<FieldOptions>) {
    Field.all.push(field)
  }
}

export class PrimaryField extends Field<PrimaryOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: Required<PrimaryOptions>,
    readonly type: FieldType,
  ) {
    super(entity, name, options, type)
  }

  columnOptions(): object {
    // TODO deprecation?
    const {
      options: { description: comment },
    } = this

    return assign(super.columnOptions(), { comment }, this.options.options)
  }
}

export class ScalarField extends Field<ScalarOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: Required<ScalarOptions>,
    readonly type: FieldType,
  ) {
    super(entity, name, options, type)
  }

  columnOptions(): object {
    // TODO deprecation?
    const {
      options: {
        primary,
        unique,
        nullable,
        default: dflt,
        description: comment,
      },
    } = this

    return assign(
      super.columnOptions(),
      { primary, unique, nullable, default: dflt, comment },
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
    readonly options: Required<SetOptions>,
    readonly type: FieldType,
  ) {
    super(entity, name, options, type)
  }

  tsType(): string {
    return this.tsName
  }

  columnOptions(): object {
    // TODO deprecation?
    const {
      tsName,
      options: { primary, default: dflt, description: comment },
    } = this

    return assign(
      super.columnOptions(),
      { primary, enum: tsName, default: dflt, comment },
      this.options.options,
    )
  }
}

export class SpecialField extends Field<SpecialOptions> {
  constructor(
    readonly entity: string,
    readonly name: string,
    readonly options: Required<SpecialOptions>,
    readonly type: FieldType,
  ) {
    super(entity, name, options, type)
  }

  columnOptions(): object {
    // TODO deprecation?
    const {
      options: { primary, description: comment },
    } = this

    return assign(
      super.columnOptions(),
      { primary, comment },
      this.options.options,
    )
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

  tsType(): string {
    return objectDefinitionRecursion(
      this.definition,
      (xs, recur) => '(' + xs.map(x => recur(x)).join('|') + ')[]',
      (o, recur) =>
        '{' +
        Object.entries(o)
          .map(([key, value]) => `${key}: ${recur(value)};`)
          .join('') +
        '}',
      type => {
        switch (type) {
          case 'int':
            return 'number'
          case 'float':
            return 'number'
          case 'string':
            return 'string'
          case 'date':
            return 'Date'
          case 'boolean':
            return 'boolean'
        }

        throw new Error() // TODO
      },
      fn => fn.name,
    )
  }

  dependencies(): string[] {
    return unique(
      defined(
        flat(
          objectDefinitionRecursion(
            this.definition,
            (xs, recur) => flat(xs.map(recur)),
            (o, recur) => flat(Object.values(o).map(recur)),
            () => undefined,
            () => {
              // TODO not mechanism to import user's ojbect
              throw new Error()
            },
          ),
        ),
      ),
    )
  }

  columnOptions(): object {
    const {
      options: {
        primary,
        unique,
        nullable,
        default: dflt,
        description: comment,
      },
    } = this

    return assign(
      super.columnOptions(),
      { primary, unique, nullable, default: dflt, comment },
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

  dependencies(): string[] {
    return [this.withEntity().name]
  }
}
