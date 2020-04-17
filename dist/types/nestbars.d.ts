import { Class } from './utils';
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
};
export declare type Plugin = () => PluginOptions;
export declare type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>;
