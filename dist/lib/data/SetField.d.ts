import { FieldType, SetValues, SetTsName, SetOptions } from '../../types/decorators';
import { Field } from './Field';
export declare class SetField extends Field<SetOptions> {
    readonly entity: string;
    readonly name: string;
    readonly values: SetValues;
    readonly tsName: SetTsName;
    readonly options: SetOptions;
    readonly type: FieldType.Enum | FieldType.Set;
    constructor(entity: string, name: string, values: SetValues, tsName: SetTsName, options: SetOptions, type: FieldType.Enum | FieldType.Set);
    tsType(): string;
    gqlType(): string;
    dbOptions(): object;
    gqlOptions(): object;
}
