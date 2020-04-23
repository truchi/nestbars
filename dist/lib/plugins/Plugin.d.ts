import { Plugin as PluginType, UserOptions, PathFunction, Helpers, Data } from '../../types/nestbars';
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
    entities: Entity[];
    dest: PathFunction;
    pluginTemplates: string;
    userTemplates: string;
    pluginHelpers: Helpers;
    userHelpers: Helpers;
    pluginContext: (type: string, entity: Entity) => any;
    userContext: (type: string, entity: Entity) => any;
    pluginData: Data;
    userData: Data;
    static all: Plugin[];
    private templates;
    private partials;
    private helpers;
    constructor(entities: Entity[], dest: PathFunction, pluginTemplates: string, userTemplates: string, pluginHelpers: Helpers, userHelpers: Helpers, pluginContext: (type: string, entity: Entity) => any, userContext: (type: string, entity: Entity) => any, pluginData: Data, userData: Data);
    loadTemplates(): Promise<Template[]>;
    loadPartials(): Promise<Partial[]>;
    loadHelpers(): Helpers;
    init(): Promise<this>;
    generate(): Promise<void>;
    static register([plugin, options]: [PluginType, UserOptions]): Promise<void>;
    static generate(): Promise<void>;
}
export {};
