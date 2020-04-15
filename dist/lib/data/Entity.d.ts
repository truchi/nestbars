import { EntityOptions, FieldOptions, FieldType } from '../../types/decorators';
import { Field } from './Field';
import { Config } from '../../types/Config';
export declare class Entity {
    readonly name: string;
    readonly options: EntityOptions;
    static all: Entity[];
    dest: string;
    templatePath: string;
    fields: Field<FieldOptions>[];
    constructor(name: string, options: EntityOptions);
    dependencies(): Entity[];
    dbOptions(): object;
    gqlOptions(): object;
    fieldsByType(...types: FieldType[]): Field<FieldOptions>[];
    static add(entity: Entity): void;
    static find(name: string): Entity | undefined;
    static init(config: Config): Entity[];
}
