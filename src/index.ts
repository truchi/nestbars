import { Nestbars, Plugin as PluginType, UserOptions } from './types/nestbars'
import { Entity } from './lib/data/Entity'
import Plugin from './lib/plugins/Plugin'

// Re-exports for user
export * from './lib/decorators'
export { default as entities } from './plugins/entities'
export { default as resolvers } from './plugins/resolvers'
export { default as services } from './plugins/services'
export { default as dtos } from './plugins/dtos'

const nestbars: Nestbars = async (
  ...plugins: [PluginType, UserOptions][]
): Promise<void> => {
  await Entity.init()
  await Promise.all(plugins.map(Plugin.register))
  await Plugin.generate()
}

export default nestbars
