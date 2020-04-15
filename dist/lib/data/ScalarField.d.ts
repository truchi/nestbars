import { FieldType, ScalarOptions } from '../../types/decorators';
import { Field } from './Field';
export declare class ScalarField extends Field<ScalarOptions> {
    readonly entity: string;
    readonly name: string;
    readonly options: ScalarOptions;
    readonly type: FieldType.Int | FieldType.Float | FieldType.String | FieldType.Date | FieldType.Boolean;
    constructor(entity: string, name: string, options: ScalarOptions, type: FieldType.Int | FieldType.Float | FieldType.String | FieldType.Date | FieldType.Boolean);
    dbOptions(): object;
    gqlOptions(): object;
}
