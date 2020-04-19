import { FieldType, FieldOptions } from '../../types/decorators';
import { Data } from './Data';
export declare const FIELD_DATA: Data;
export declare class Field {
    readonly entity: string;
    readonly name: string;
    readonly type: FieldType;
    readonly options: FieldOptions;
    static all: Field[];
    constructor(entity: string, name: string, type: FieldType, options: FieldOptions);
    data(): any;
    static add(field: Field): void;
}
