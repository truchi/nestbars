import { Helpers } from '../../types/nestbars';
import { Entity } from '../data/Entity';
export declare type Context = {
    entities: Entity[];
    entity: Entity;
};
declare const helpers: Helpers;
export default helpers;
