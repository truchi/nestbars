import { Class } from '../../types/utils'
import {
  FieldType,
  RelationWithEntity,
  RelationWithField,
  RelationJoinTable,
} from '../../types/decorators'
import { Field } from './Field'

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
