import { Class } from '../../types/utils';
import { FieldType, RelationWithEntity, RelationWithField, RelationJoinTable } from '../../types/decorators';
import { Field } from './Field';
export declare class ManyToManyField<T extends Class> extends Field<{}> {
    readonly entity: string;
    readonly name: string;
    readonly withEntity: RelationWithEntity<T>;
    readonly withField: RelationWithField<T>;
    readonly joinTable: RelationJoinTable;
    static readonly options: {};
    static readonly type: FieldType;
    constructor(entity: string, name: string, withEntity: RelationWithEntity<T>, withField: RelationWithField<T>, joinTable: RelationJoinTable);
    tsType(): string;
    dbType(): string;
    gqlType(): string;
    dependencies(): string[];
}
