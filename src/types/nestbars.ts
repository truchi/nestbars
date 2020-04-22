import { Class } from './utils'
import { Entity } from '../lib/data/Entity'
import { Field } from '../lib/data/Field'

export type Context<T> = {
  type: string
  entities: T[]
  entity: T
  context: object
}

export type PathFunction = (type?: string, name?: string) => string

export type Helpers = {
  [key: string]: (...args: any[]) => any
}

export type Data = {
  entity?: (entity: Entity) => object
  field?: (field: Field) => object
}

export type UserOptions = {
  classes: Class[]
  dest: string | PathFunction
  templates?: string
  helpers?: Helpers
  context?: () => object
  data?: Data
}

export type PluginOptions = {
  templates: string
  helpers?: Helpers
  context?: () => object
  data?: Data
}

export type Plugin = (entities: Entity[], path: PathFunction) => PluginOptions

export type Nestbars = (...plugins: [Plugin, UserOptions][]) => Promise<void>
