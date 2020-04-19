import { EntityOptions, FieldType } from '../../types/decorators';
import { Data } from './Data';
import { Field } from './Field';
export declare const ENTITY_DATA: Data;
export declare class Entity {
    readonly name: string;
    readonly options: EntityOptions;
    static all: Entity[];
    fields: Field[];
    constructor(name: string, options: EntityOptions);
    fieldsByType(...types: FieldType[]): Field[];
    data(): any;
    static add(entity: Entity): void;
    static init(): Entity[];
}
