import { Class } from './utils';
import { Entity } from '../lib/data/Entity';
import { Field } from '../lib/data/Field';
export declare type Context<T> = {
    plugin: string;
    type: string;
    entities: T[];
    entity: T;
    context: any;
};
export declare type PathFunction = (type?: string, name?: string) => string;
export declare type Helpers = {
    [key: string]: (...args: any[]) => any;
};
export declare type Options = {
    classes: Class[];
    dest: string | PathFunction;
    templates?: string;
    helpers?: Helpers;
};
export declare type PluginOptions = {
    name: string;
    templates: string;
    helpers?: Helpers;
    context?: () => any;
    entityData?: (entity: Entity) => any;
    fieldData?: (field: Field) => any;
};
export declare type Plugin = (entities: Entity[], path: PathFunction) => PluginOptions;
export declare type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>;
