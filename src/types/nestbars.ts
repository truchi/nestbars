import { Class } from './utils'

export type PathFunction = (type?: string, name?: string) => string

export type Options = {
  entities: Class[]
  dest: string | PathFunction
  templates?: string
  helpers?: ((...args: any[]) => any)[]
}

export type PluginOptions = {
  name: string
  templates: string
  helpers?: ((...args: any[]) => any)[]
}

export type Plugin = () => PluginOptions

export type Nestbars = (...plugins: [Plugin, Options][]) => Promise<void>
