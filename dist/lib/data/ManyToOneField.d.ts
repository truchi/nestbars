import { Class } from '../../types/utils';
import { FieldType, RelationWithEntity, RelationWithField, RelationJoinColumn } from '../../types/decorators';
import { Field } from './Field';
export declare class ManyToOneField<T extends Class> extends Field<{}> {
    readonly entity: string;
    readonly name: string;
    readonly withEntity: RelationWithEntity<T>;
    readonly withField: RelationWithField<T>;
    readonly joinColumn: RelationJoinColumn;
    static readonly options: {};
    static readonly type: FieldType;
    constructor(entity: string, name: string, withEntity: RelationWithEntity<T>, withField: RelationWithField<T>, joinColumn: RelationJoinColumn);
    tsType(): string;
    dbType(): string;
    gqlType(): string;
    dependencies(): string[];
}
