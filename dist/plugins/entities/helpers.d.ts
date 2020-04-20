import { Context } from '../../types/nestbars';
import { Entity } from '../../lib/data/Entity';
import { Field } from '../../lib/data/Field';
declare const _default: {
    dbImports(this: Context<Entity>): string;
    gqlImports(this: Context<Entity>): string;
    dependencies(this: Context<Entity>): {
        name: string;
        from: string;
    }[];
    enums(this: Context<Entity>): Field[];
    entityData(this: Context<Entity>): object;
    fieldData(field: Field): object;
};
export default _default;
