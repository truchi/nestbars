import { resolve, parse } from 'path'
import {
  Plugin as PluginType,
  Options,
  PathFunction,
} from '../../types/nestbars'
import { toPathFunction, readFile, readDir } from '../utils'
import readDirRec from 'recursive-readdir'
import { Class } from 'src/types/utils'

const PARTIALS = 'partials'
const ANCHORS = {
  NAME: '[name]',
  TYPE: '[type]',
}

export default class Plugin {
  static all: Plugin[] = []

  private templates: { type: string; template: string }[] = []
  private partials

  constructor(
    public name: string,
    public entities: Class[],
    public dest: PathFunction,
    public pluginTemplates: string,
    public userTemplates?: string,
    public pluginHelpers: ((...args: any[]) => any)[] = [],
    public userHelpers: ((...args: any[]) => any)[] = [],
  ) {}

  async loadTemplates(): Promise<void> {
    const readPlugin = (file: string) => async () =>
      await readFile(resolve(this.pluginTemplates + '/' + file))
    const readUser = async (file: string) =>
      await readFile(resolve(this.userTemplates + '/' + file))

    this.templates = await Promise.all(
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

  async loadPartials(): Promise<void> {
    const read = (dir: string) =>
      readDirRec(dir)
        .catch(() => [])
        .then((files: string[]) =>
          files.map(file => ({ file, name: file.replace(dir + '/', '') })),
        )

    this.partials = await Promise.all(
      (
        await Promise.all([
          ...(await read(
            this.userTemplates
              ? resolve(this.userTemplates + '/' + PARTIALS)
              : undefined,
          )),
          ...(await read(resolve(this.pluginTemplates + '/' + PARTIALS))),
        ])
      )
        .filter(
          ({ name }, i, xs) =>
            xs.findIndex(({ name: _name }) => name === _name) === i,
        )
        .map(async ({ file, name }) => ({
          name: (({ dir, name: _name } = parse(name)) =>
            ((dir ? dir + '/' : '') + _name)
              .replace('/', '__')
              .replace('.', '_'))(),
          partial: await readFile(file),
        })),
    )
  }

  async init(): Promise<this> {
    await this.loadTemplates()
    await this.loadPartials()

    return this
  }

  async generate(): Promise<void> {
    return
  }

  static async registerPlugin([plugin, options]: [
    PluginType,
    Options,
  ]): Promise<void> {
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
