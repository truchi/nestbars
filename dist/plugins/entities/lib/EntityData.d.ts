import { Entity } from '../../../lib/data/Entity';
import { FieldData } from './FieldData';
export declare class EntityData {
    readonly dest: string;
    readonly entity: Entity;
    readonly fields: FieldData[];
    readonly dbDecorator = "Entity";
    readonly gqlDecorator = "ObjectType";
    readonly dbOptions: object;
    readonly gqlOptions: object;
    constructor(entity: Entity, dest: string);
}
