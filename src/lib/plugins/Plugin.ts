import { resolve, parse } from 'path'
import readDirRec from 'recursive-readdir'
import * as HandleBars from 'handlebars'
import {
  Plugin as PluginType,
  UserOptions,
  PathFunction,
  Helpers,
  Context,
  Data,
} from '../../types/nestbars'
import {
  toPathFunction,
  readFile,
  readDir,
  writeFile,
  uniqueBy,
} from '../utils'
import helpers, { reset as resetHelpersData } from './helpers'
import {
  Entity,
  set as setEntityData,
  reset as resetEntityData,
} from '../data/Entity'
import { set as setFieldData, reset as resetFieldData } from '../data/Field'

export const PARTIALS = 'partials'
export const ANCHORS = {
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
    public entities: Entity[],
    public dest: PathFunction,
    public pluginTemplates: string,
    public userTemplates: string,
    public pluginHelpers: Helpers,
    public userHelpers: Helpers,
    public pluginContext: () => any,
    public userContext: () => any,
    public pluginData: Data,
    public userData: Data,
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

  async generate(): Promise<void> {
    const generate = (entity: Entity) => async ({ type, template }) => (
      resetHelpersData(),
      await writeFile(
        this.dest(type, entity.name),
        HandleBars.compile(template)({
          type,
          entities: Entity.all,
          entity,
          context: {
            ...this.pluginContext(),
            ...this.userContext(),
          },
        } as Context<Entity>),
      )
    )

    await Promise.all(
      this.entities.map(async entity =>
        Promise.all(this.templates.map(generate(entity))),
      ),
    )
  }

  static async register([plugin, options]: [PluginType, UserOptions]): Promise<
    void
  > {
    const {
      classes,
      dest: _dest,
      templates: userTemplates,
      helpers: userHelpers,
      context: userContext,
      data: userData,
    } = options

    const names = classes.map(({ name }) => name)
    const entities = Entity.all.filter(({ name }) => names.includes(name))
    const dest = toPathFunction(_dest, ANCHORS)

    const {
      templates: pluginTemplates,
      helpers: pluginHelpers,
      context: pluginContext,
      data: pluginData,
    } = plugin(entities, dest)

    Plugin.all.push(
      await new Plugin(
        entities,
        dest,
        pluginTemplates,
        userTemplates || '',
        pluginHelpers || {},
        userHelpers || {},
        pluginContext || (() => ({})),
        userContext || (() => ({})),
        {
          entity: pluginData.entity ?? (() => ({})),
          field: pluginData.field ?? (() => ({})),
        },
        {
          entity: userData.entity ?? (() => ({})),
          field: userData.field ?? (() => ({})),
        },
      ).init(),
    )
  }

  static async generate(): Promise<void> {
    Plugin.all.map(plugin => {
      // Register global helpers
      Object.entries(helpers).map(([name, helper]) =>
        HandleBars.registerHelper(name, helper),
      )

      // Register plugin data for entities and fields
      plugin.entities.map(
        entity => (
          entity.fields.map(field =>
            setFieldData(field, {
              ...plugin.pluginData.field(field),
              ...plugin.userData.field(field),
            }),
          ),
          setEntityData(entity, {
            ...plugin.pluginData.entity(entity),
            ...plugin.userData.entity(entity),
          })
        ),
      )

      // Register helpers, partials, and run generation
      Object.entries(plugin.helpers).map(([name, helper]) =>
        HandleBars.registerHelper(name, helper),
      )
      plugin.partials.map(({ name, partial }) =>
        HandleBars.registerPartial(name, partial),
      )
      plugin.generate()

      // Resets
      Object.entries(plugin.helpers).map(([name]) =>
        HandleBars.unregisterHelper(name),
      )
      plugin.partials.map(({ name }) => HandleBars.unregisterPartial(name))
      resetEntityData()
      resetFieldData()
    })
  }
}
