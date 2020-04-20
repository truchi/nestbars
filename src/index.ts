import { Nestbars, Plugin as PluginType, Options } from './types/nestbars'
import { Entity } from './lib/data/Entity'
import Plugin from './lib/plugins/Plugin'

// Re-exports for user
export * from './lib/decorators'
export { default as entities } from './plugins/entities'
export { default as resolvers } from './plugins/resolvers'
export { default as services } from './plugins/services'

const nestbars: Nestbars = async (
  ...plugins: [PluginType, Options][]
): Promise<void> => {
  Plugin.entities = await Entity.init()
  await Promise.all(plugins.map(Plugin.register))
  await Plugin.generate()
}

export default nestbars
