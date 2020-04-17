import { resolve, parse } from 'path'
import * as HandleBars from 'handlebars'
import {
  Plugin as PluginType,
  Options,
  PathFunction,
  Helpers,
} from '../../types/nestbars'
import { toPathFunction, readFile, readDir, uniqueBy } from '../utils'
import readDirRec from 'recursive-readdir'
import { Class } from 'src/types/utils'

const PARTIALS = 'partials'
const ANCHORS = {
  NAME: '[name]',
  TYPE: '[type]',
}

type Template = { type: string; template: string }
type Partial = { name: string; partial: string }

export default class Plugin {
  static all: Plugin[] = []

  private templates: Template[] = []
  private partials: Partial[] = []
  private helpers: Helpers = {}

  constructor(
    public name: string,
    public entities: Class[],
    public dest: PathFunction,
    public pluginTemplates: string,
    public userTemplates?: string,
    public pluginHelpers: Helpers = {},
    public userHelpers: Helpers = {},
  ) {}

  async loadTemplates(): Promise<Template[]> {
    const readPlugin = (file: string) => async () =>
      await readFile(resolve(this.pluginTemplates + '/' + file))
    const readUser = async (file: string) =>
      await readFile(resolve(this.userTemplates + '/' + file))

    return await Promise.all(
      (await readDir(this.pluginTemplates))
        .filter(file => file !== PARTIALS)
        .map(async file => ({
          type: parse(file).name,
          template: this.userTemplates
            ? await readUser(file).catch(readPlugin(file))
            : await readPlugin(file)(),
        })),
    )
  }

  async loadPartials(): Promise<Partial[]> {
    const read = (dir: string) =>
      readDirRec(dir)
        .catch(() => [])
        .then((files: string[]) =>
          files.map(file => ({ file, name: file.replace(dir + '/', '') })),
        )

    return await Promise.all(
      uniqueBy('name')(
        await Promise.all([
          ...(await read(
            this.userTemplates
              ? resolve(this.userTemplates + '/' + PARTIALS)
              : undefined,
          )),
          ...(await read(resolve(this.pluginTemplates + '/' + PARTIALS))),
        ]),
      ).map(async ({ file, name }) => ({
        name: (({ dir, name: _name } = parse(name)) =>
          ((dir ? dir + '/' : '') + _name)
            .replace('/', '__')
            .replace('.', '_'))(),
        partial: await readFile(file),
      })),
    )
  }

  loadHelpers(): Helpers {
    return [
      ...Object.entries(this.pluginHelpers),
      ...Object.entries(this.userHelpers),
    ].reduce((helpers, [name, fn]) => ({ ...helpers, [name]: fn }), {})
  }

  async init(): Promise<this> {
    this.templates = await this.loadTemplates()
    this.partials = await this.loadPartials()
    this.helpers = this.loadHelpers()

    return this
  }

  async generate(): Promise<void> {
    Plugin.load(this)
    Plugin.unload(this)
    return
  }

  static load(plugin: Plugin): void {
    Object.entries(plugin.helpers).map(([name, helper]) =>
      HandleBars.registerHelper(name, helper),
    )
    plugin.partials.map(({ name, partial }) =>
      HandleBars.registerPartial(name, partial),
    )
  }

  static unload(plugin: Plugin): void {
    Object.entries(plugin.helpers).map(([name]) =>
      HandleBars.unregisterHelper(name),
    )
    plugin.partials.map(({ name }) => HandleBars.unregisterPartial(name))
  }

  static async register([plugin, options]: [PluginType, Options]): Promise<
    void
  > {
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
      await new Plugin(
        name,
        entities,
        toPathFunction(dest, ANCHORS),
        pluginTemplates,
        userTemplates,
        pluginHelpers,
        userHelpers,
      ).init(),
    )
  }
}
