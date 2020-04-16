import { Nestbars, Plugin as PluginType, Options } from './types/nestbars'
import Plugin from './lib/plugins/Plugin'

// Re-exports for user
export * from './lib/decorators'
export { default as entities } from './plugins/entities'
export { default as resolvers } from './plugins/resolvers'

const nestbars: Nestbars = async (
  ...plugins: [PluginType, Options][]
): Promise<void> => {
  await Promise.all(plugins.map(Plugin.registerPlugin))

  console.log('DONE', JSON.stringify(Plugin.all, null, 2))
}

export default nestbars
