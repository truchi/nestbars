import { Class } from './utils'

export type Context<T> = {
  plugin: string
  type: string
  entities: T[]
  entity: T
  context: any
}

export type PathFunction = (type?: string, name?: string) => string

export type Helpers = {
  [key: string]: (...args: any[]) => any
}

export type Options = {
  entities: Class[]
  dest: string | PathFunction
  templates?: string
  helpers?: Helpers
}

export type PluginOptions = {
  name: string
  templates: string
  helpers?: Helpers
  context?: () => any
}

export type Plugin = (entities: Class[], dest: PathFunction) => PluginOptions

export type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>
