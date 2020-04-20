import { FieldType, FieldOptions } from '../../types/decorators';
export declare const get: (field: Field) => any;
export declare const set: (field: Field, data: any) => void;
export declare const reset: () => void;
export declare class Field {
    readonly entity: string;
    readonly name: string;
    readonly type: FieldType;
    readonly options: FieldOptions;
    static all: Field[];
    constructor(entity: string, name: string, type: FieldType, options: FieldOptions);
    relatesTo(): string;
    tsType(): string;
    data(): any;
    static add(field: Field): void;
}
