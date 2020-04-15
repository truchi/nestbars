import { FieldType, SpecialOptions } from '../../types/decorators';
import { Field } from './Field';
export declare class SpecialField extends Field<SpecialOptions> {
    readonly entity: string;
    readonly name: string;
    readonly options: SpecialOptions;
    readonly type: FieldType.Created | FieldType.Updated | FieldType.Version;
    constructor(entity: string, name: string, options: SpecialOptions, type: FieldType.Created | FieldType.Updated | FieldType.Version);
    dbOptions(): object;
    gqlOptions(): object;
}
