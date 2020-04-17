import { Class } from './utils';
export declare type Context<T> = {
    plugin: string;
    type: string;
    entities: T[];
    entity: T;
    context: any;
};
export declare type ContextFunction = (entities: Class[], dest: PathFunction) => any;
export declare type PathFunction = (type?: string, name?: string) => string;
export declare type Helpers = {
    [key: string]: (...args: any[]) => any;
};
export declare type Options = {
    entities: Class[];
    dest: string | PathFunction;
    templates?: string;
    helpers?: Helpers;
};
export declare type PluginOptions = {
    name: string;
    templates: string;
    helpers?: Helpers;
    context?: ContextFunction;
};
export declare type Plugin = () => PluginOptions;
export declare type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>;
