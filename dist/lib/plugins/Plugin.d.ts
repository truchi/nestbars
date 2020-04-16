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
    constructor(name: string, entities: Class[], dest: PathFunction, pluginTemplates: string, userTemplates?: string, pluginHelpers?: ((...args: any[]) => any)[], userHelpers?: ((...args: any[]) => any)[]);
    static registerPlugin(plugin: PluginType, options: Options): void;
}
