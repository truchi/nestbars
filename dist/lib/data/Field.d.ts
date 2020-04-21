import { FieldType, FieldOptions } from '../../types/decorators';
import { Entity } from './Entity';
export declare const get: (field: Field) => any;
export declare const set: (field: Field, data: any) => void;
export declare const reset: () => void;
export declare class Field {
    readonly name: string;
    readonly type: FieldType;
    readonly options: FieldOptions;
    static all: Field[];
    entity: Entity;
    tsType: string;
    dbType: string;
    gqlType: string;
    relation?: Entity;
    readonly isPrimary: boolean;
    readonly isGenerated: boolean;
    readonly isRelation: boolean;
    constructor(name: string, type: FieldType, options: FieldOptions);
    init(): Promise<this>;
    is(...args: (FieldType | (new () => FieldOptions))[]): boolean;
    data(): any;
    static add(field: Field): void;
}
