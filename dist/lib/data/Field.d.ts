import { FieldType, FieldOptions } from '../../types/decorators';
export declare class Field {
    readonly entity: string;
    readonly name: string;
    readonly type: FieldType;
    readonly options: FieldOptions;
    static all: Field[];
    constructor(entity: string, name: string, type: FieldType, options: FieldOptions);
    static add(field: Field): void;
}
