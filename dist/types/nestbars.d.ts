import { Class } from './utils';
import { Entity } from '../lib/data/Entity';
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
};
export declare type Plugin = (entities: Entity[], dest: PathFunction) => PluginOptions;
export declare type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>;
