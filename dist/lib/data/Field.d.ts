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
    tsType: string;
    dbType: string;
    gqlType: string;
    constructor(entity: string, name: string, type: FieldType, options: FieldOptions);
    init(): Promise<this>;
    data(): any;
    static add(field: Field): void;
}
