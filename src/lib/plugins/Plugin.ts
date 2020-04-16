import { normalize } from 'path'
import {
  Plugin as PluginType,
  Options,
  PathFunction,
} from '../../types/nestbars'
import { toPathFunction } from '../utils'
import { Class } from 'src/types/utils'

const ANCHORS = {
  NAME: '[name]',
  TYPE: '[type]',
}

export default class Plugin {
  static all: Plugin[] = []

  constructor(
    public name: string,
    public entities: Class[],
    public dest: PathFunction,
    public pluginTemplates: string,
    public userTemplates?: string,
    public pluginHelpers: ((...args: any[]) => any)[] = [],
    public userHelpers: ((...args: any[]) => any)[] = [],
  ) {}

  static registerPlugin(plugin: PluginType, options: Options): void {
    const {
      name,
      templates: pluginTemplates,
      helpers: pluginHelpers,
    } = plugin()
    const {
      entities,
      dest,
      templates: userTemplates,
      helpers: userHelpers,
    } = options

    Plugin.all.push(
      new Plugin(
        name,
        entities,
        toPathFunction(dest, ANCHORS),
        normalize(pluginTemplates),
        normalize(userTemplates),
        pluginHelpers,
        userHelpers,
      ),
    )
  }
}
