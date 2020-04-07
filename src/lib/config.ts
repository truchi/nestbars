import { resolve } from 'path'
import glob from 'fast-glob'
import { UserConfig } from './types/UserConfig'

// Config type
export type Config = {
  src: string[]
  dest: (name: string, type: string) => string
  templates: (type: string) => string
}

// Path of the config file
const CONFIG_FILE = 'nestbars.config.json'
const NAME_ANCHOR = '[name]'
const TYPE_ANCHOR = '[type]'

// Defaults config values
// Paths relative to user's project root
const DEFAULTS: UserConfig = {
  src: ['src/.nestbars/**/*.ts'],
  dest: `src/${NAME_ANCHOR}/${TYPE_ANCHOR}.ts`,
  templates: `${TYPE_ANCHOR}.ts.hbs`,
}

// Retrieves full config
export const getConfig = async (
  // Path of nestbars templates directory
  nestbarsTemplatesPath: string,
): Promise<Config> => {
  let userConfig: UserConfig
  let templatesPath: string

  // Import config file
  try {
    userConfig = await import(resolve(CONFIG_FILE))

    templatesPath =
      // If the user gave a templates path
      userConfig.templates !== undefined
        ? //
          resolve()
        : nestbarsTemplatesPath
  } catch (_) {
    userConfig = DEFAULTS
    templatesPath = nestbarsTemplatesPath
  }

  // Merge to defaults
  userConfig = Object.assign({}, DEFAULTS, userConfig)

  // Deglob src
  const src = await glob(userConfig.src.map(src => resolve(src)))

  // Convert anchored paths to functions
  const config: Config = {
    src,
    dest: ((dest = userConfig.dest) =>
      //
      (name: string, type: string) =>
        resolve(
          dest //
            .replace(NAME_ANCHOR, name)
            .replace(TYPE_ANCHOR, type),
        ))(),
    templates: ((templates = userConfig.templates) =>
      //
      (type: string) =>
        resolve(templatesPath, templates.replace(TYPE_ANCHOR, type)))(),
  }

  return Object.assign(userConfig, config) as Config
}
