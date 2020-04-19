import { EntityOptions, FieldType } from '../../types/decorators';
import { Field } from './Field';
export declare class Entity {
    readonly name: string;
    readonly options: EntityOptions;
    static all: Entity[];
    fields: Field[];
    constructor(name: string, options: EntityOptions);
    fieldsByType(...types: FieldType[]): Field[];
    static add(entity: Entity): void;
    static find(name: string): Entity | undefined;
    static init(): Entity[];
}
