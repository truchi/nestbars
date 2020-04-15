import { FieldType, FieldOptions } from '../../types/decorators'

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
