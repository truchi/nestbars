import { resolve, parse } from 'path'
import readDirRec from 'recursive-readdir'
import * as HandleBars from 'handlebars'
import { Class } from '../../types/utils'
import {
  Plugin as PluginType,
  Options,
  PathFunction,
  Helpers,
  Context,
  ContextFunction,
} from '../../types/nestbars'
import {
  toPathFunction,
  readFile,
  readDir,
  writeFile,
  uniqueBy,
} from '../utils'
import helpers from './helpers'
import { Entity } from '../data'

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
    public context: ContextFunction = () => null,
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
            .replace(/\//g, '__')
            .replace(/\./g, '_'))(),
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

  async generate(entities: Entity[]): Promise<void> {
    const context = this.context(this.entities, this.dest)

    await Promise.all(
      entities.map(async entity =>
        Promise.all(
          this.templates.map(
            async ({ type, template }) =>
              await writeFile(
                this.dest(type, entity.name),
                HandleBars.compile(template)({
                  plugin: this.name,
                  type,
                  entities: Entity.all,
                  entity,
                  context,
                } as Context<Entity>),
              ),
          ),
        ),
      ),
    )
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
      context,
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
        context,
      ).init(),
    )
  }

  static async generate(entities: Entity[]): Promise<void> {
    // Register global helpers
    Object.entries(helpers).map(([name, helper]) =>
      HandleBars.registerHelper(name, helper),
    )

    Plugin.all.map(plugin => {
      const names = plugin.entities.map(({ name }) => name)

      Plugin.load(plugin)
      plugin.generate(entities.filter(({ name }) => names.includes(name)))
      Plugin.unload(plugin)
    })
  }
}
