import { FieldType, PrimaryOptions } from '../../types/decorators';
import { Field } from './Field';
export declare class PrimaryField extends Field<PrimaryOptions> {
    readonly entity: string;
    readonly name: string;
    readonly options: PrimaryOptions;
    readonly type: FieldType.Id | FieldType.Uuid;
    constructor(entity: string, name: string, options: PrimaryOptions, type: FieldType.Id | FieldType.Uuid);
    dbOptions(): object;
    gqlOptions(): object;
}
