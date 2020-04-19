import { Plugin as PluginType, Options, PathFunction, Helpers } from '../../types/nestbars';
import { Entity } from '../data/Entity';
export declare const PARTIALS = "partials";
export declare const ANCHORS: {
    NAME: string;
    TYPE: string;
};
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
    entities: Entity[];
    dest: PathFunction;
    pluginTemplates: string;
    userTemplates?: string;
    pluginHelpers: Helpers;
    userHelpers: Helpers;
    context: () => any;
    static all: Plugin[];
    static entities: Entity[];
    private templates;
    private partials;
    private helpers;
    constructor(name: string, entities: Entity[], dest: PathFunction, pluginTemplates: string, userTemplates?: string, pluginHelpers?: Helpers, userHelpers?: Helpers, context?: () => any);
    loadTemplates(): Promise<Template[]>;
    loadPartials(): Promise<Partial[]>;
    loadHelpers(): Helpers;
    init(): Promise<this>;
    generate(): Promise<void>;
    static load(plugin: Plugin): void;
    static unload(plugin: Plugin): void;
    static register([plugin, options]: [PluginType, Options]): Promise<void>;
    static generate(): Promise<void>;
}
export {};
