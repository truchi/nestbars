import { Class } from '../../types/utils'
import {
  FieldType,
  RelationWithEntity,
  RelationWithField,
} from '../../types/decorators'
import { Field } from './Field'

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
