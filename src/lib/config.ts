import { assign, toPathFunction } from '../lib/utils'
import { Config } from '../types/Config'
import { UserConfig } from '../types/UserConfig'

// Anchors
const ANCHORS = {
  NAME: '[name]',
  TYPE: '[type]',
}

// Defaults config values
const DEFAULTS: UserConfig = {
  entities: [],
  // Relative to user's source directory
  dest: `${ANCHORS.NAME}/${ANCHORS.TYPE}.ts`,
  // Relative to nestbars template directory
  templates: `${ANCHORS.TYPE}/main.hbs`,
}

// Sanitizes config
export const sanitizeConfig = async (
  // Config given to main nestbars function from user
  userConfig: UserConfig,
  // Absolute path to user root directory
  userRootPath: string,
  // Absolute path to nestbars templates directory
  nestbarsTemplatesPath: string,
  // Absolute path to user source directory
  userSrcPath: string,
): Promise<Config> => {
  const destPath = userConfig.dest !== undefined ? userRootPath : userSrcPath
  const templatesPath =
    userConfig.templates !== undefined ? userRootPath : nestbarsTemplatesPath

  // Merge to defaults
  userConfig = assign(DEFAULTS, userConfig)

  // Convert anchored paths to functions,
  // from correct directory
  return assign(userConfig, {
    dest: toPathFunction(userConfig.dest, ANCHORS, destPath),
    templates: toPathFunction(userConfig.templates, ANCHORS, templatesPath),
  }) as Config
}
