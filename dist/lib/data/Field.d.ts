import { FieldType, FieldOptions } from '../../types/decorators';
import { Entity } from './Entity';
export declare const get: (field: Field) => any;
export declare const set: (field: Field, data: any) => void;
export declare const reset: () => void;
export declare class Field {
    readonly _entity: string;
    readonly name: string;
    readonly type: FieldType;
    readonly options: FieldOptions;
    static all: Field[];
    entity: Entity;
    relation?: Entity;
    enum?: string;
    tsType: string;
    dbType: string;
    gqlType: string;
    readonly isPrimary: boolean;
    readonly isGenerated: boolean;
    readonly isRelation: boolean;
    readonly isData: boolean;
    constructor(_entity: string, name: string, type: FieldType, options: FieldOptions);
    init(): Promise<this>;
    is(...args: (FieldType | (new () => FieldOptions))[]): boolean;
    data(): any;
    static add(field: Field): void;
    static init(): void;
}
