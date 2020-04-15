import { Class } from '../../types/utils'
import {
  FieldType,
  RelationWithEntity,
  RelationWithField,
  RelationJoinColumn,
} from '../../types/decorators'
import { Field } from './Field'

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
