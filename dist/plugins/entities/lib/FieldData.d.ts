import { Field } from '../../../lib/data/Field';
export declare class FieldData {
    readonly field: Field;
    readonly dbDecorator: string;
    readonly gqlDecorator: string;
    readonly tsType: string;
    readonly gqlType: string;
    readonly dbOptions: {};
    readonly gqlOptions: {};
    constructor(field: Field);
}
