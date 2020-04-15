import { Entity } from '../data/Entity';
export declare type Context = {
    entities: Entity[];
    entity: Entity;
};
export declare const generate: (entities: Entity[], templatesPath: string) => Promise<void>;
