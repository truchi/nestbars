import { EntityOptions, FieldType, FieldOptions } from '../../types/decorators';
import { Field } from './Field';
export declare const get: (entity: Entity) => any;
export declare const set: (entity: Entity, data: any) => void;
export declare const reset: () => void;
export declare class Entity {
    readonly name: string;
    readonly options: EntityOptions;
    static all: Entity[];
    fields: Field[];
    constructor(name: string, options: EntityOptions);
    by(...args: (FieldType | (new () => FieldOptions))[]): Field[];
    data(): any;
    static add(entity: Entity): void;
    static find(name: string): Entity;
    static init(): Promise<Entity[]>;
}
