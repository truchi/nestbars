import { Plugin as PluginType, Options, PathFunction, Helpers } from '../../types/nestbars';
import { Class } from 'src/types/utils';
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
    loadTemplates(): Promise<void>;
    loadPartials(): Promise<void>;
    loadHelpers(): void;
    init(): Promise<this>;
    generate(): Promise<void>;
    static registerPlugin([plugin, options]: [PluginType, Options]): Promise<void>;
}
