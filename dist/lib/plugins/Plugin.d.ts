import { Plugin as PluginType, Options, PathFunction, Helpers } from '../../types/nestbars';
import { Class } from 'src/types/utils';
declare type Template = {
    type: string;
    template: string;
};
declare type Partial = {
    name: string;
    partial: string;
};
export default class Plugin {
    name: string;
    entities: Class[];
    dest: PathFunction;
    pluginTemplates: string;
    userTemplates?: string;
    pluginHelpers: Helpers;
    userHelpers: Helpers;
    static all: Plugin[];
    private templates;
    private partials;
    private helpers;
    constructor(name: string, entities: Class[], dest: PathFunction, pluginTemplates: string, userTemplates?: string, pluginHelpers?: Helpers, userHelpers?: Helpers);
    loadTemplates(): Promise<Template[]>;
    loadPartials(): Promise<Partial[]>;
    loadHelpers(): Helpers;
    init(): Promise<this>;
    generate(): Promise<void>;
    static load(plugin: Plugin): void;
    static unload(plugin: Plugin): void;
    static register([plugin, options]: [PluginType, Options]): Promise<void>;
}
export {};
