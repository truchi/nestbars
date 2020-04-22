import { Class } from './utils';
import { Entity } from '../lib/data/Entity';
import { Field } from '../lib/data/Field';
export declare type Context<T> = {
    type: string;
    entities: T[];
    entity: T;
    context: object;
};
export declare type PathFunction = (type?: string, name?: string) => string;
export declare type Helpers = {
    [key: string]: (...args: any[]) => any;
};
export declare type Data = {
    entity?: (entity: Entity) => object;
    field?: (field: Field) => object;
};
export declare type UserOptions = {
    classes: Class[];
    dest: string | PathFunction;
    templates?: string;
    helpers?: Helpers;
    context?: () => object;
    data?: Data;
};
export declare type PluginOptions = {
    templates: string;
    helpers?: Helpers;
    context?: () => object;
    data?: Data;
};
export declare type Plugin = (entities: Entity[], path: PathFunction) => PluginOptions;
export declare type Nestbars = (...plugins: [Plugin, UserOptions][]) => Promise<void>;
