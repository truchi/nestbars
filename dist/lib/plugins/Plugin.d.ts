import { Plugin as PluginType, Options, PathFunction } from '../../types/nestbars';
import { Class } from 'src/types/utils';
export default class Plugin {
    name: string;
    entities: Class[];
    dest: PathFunction;
    pluginTemplates: string;
    userTemplates?: string;
    pluginHelpers: ((...args: any[]) => any)[];
    userHelpers: ((...args: any[]) => any)[];
    static all: Plugin[];
    private templates;
    private partials;
    constructor(name: string, entities: Class[], dest: PathFunction, pluginTemplates: string, userTemplates?: string, pluginHelpers?: ((...args: any[]) => any)[], userHelpers?: ((...args: any[]) => any)[]);
    loadTemplates(): Promise<void>;
    loadPartials(): Promise<void>;
    init(): Promise<this>;
    generate(): Promise<void>;
    static registerPlugin([plugin, options]: [PluginType, Options]): Promise<void>;
}
