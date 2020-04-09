import { resolve } from 'path'
import { Config, UserConfig } from '../types'
import { toPathFunction } from '../lib/utils'

// Anchors
const ANCHORS = {
  NAME: '[name]',
  TYPE: '[type]',
}

// Defaults config values
const DEFAULTS: UserConfig = {
  entities: [],
  // Relative to user's project root directory
  dest: `src/${ANCHORS.NAME}/${ANCHORS.TYPE}.ts`,
  // Relative to nestbars template directory
  templates: `src/${ANCHORS.NAME}/${ANCHORS.TYPE}.ts`,
}

// Sanitizes config
export const sanitizeConfig = async (
  // Config given to main nestbars function from user
  userConfig: UserConfig,
  // Absolute path to nestbars templates directory
  nestbarsTemplatesPath: string,
): Promise<Config> => {
  const templatesPath =
    // If the user gave a templates path
    userConfig.templates !== undefined
      ? // Absolute path to his project root directory
        resolve()
      : // Absolute path to nestbars tempaltes directory
        nestbarsTemplatesPath

  // Merge to defaults
  userConfig = Object.assign({}, DEFAULTS, userConfig)

  // Convert anchored paths to functions,
  // from correct directory
  return Object.assign({}, userConfig, {
    dest: toPathFunction(userConfig.dest, ANCHORS),
    templates: toPathFunction(userConfig.templates, ANCHORS, templatesPath),
  }) as Config
}
