// TODO user documentation
import { Class, PathFunction } from './utils'

// User config type
export type UserConfig = {
  entities: Class[]
  dest?: string | PathFunction | undefined
  templates?: string | PathFunction
}
