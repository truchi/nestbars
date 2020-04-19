import { Nestbars, Plugin as PluginType, Options } from './types/nestbars'
import { Entity } from './lib/data'
import Plugin from './lib/plugins/Plugin'

// Re-exports for user
export * from './lib/decorators'
export { default as entities } from './plugins/entities'
export { default as resolvers } from './plugins/resolvers'
export { default as services } from './plugins/services'

const nestbars: Nestbars = async (
  ...plugins: [PluginType, Options][]
): Promise<void> => {
  await Promise.all(plugins.map(Plugin.register))
  await Plugin.generate(Entity.init())
}

export default nestbars
