import { Nestbars, Plugin as PluginType, Options } from './types/nestbars'
import Plugin from './lib/plugins/Plugin'

// Re-exports for user
export * from './lib/decorators'
export { default as entities } from './plugins/entities'
export { default as resolvers } from './plugins/resolvers'

const nestbars: Nestbars = async (
  ...plugins: [PluginType, Options][]
): Promise<void> => {
  plugins.map(([plugin, options]) => Plugin.registerPlugin(plugin, options))

  await Promise.all(Plugin.all.map(plugin => plugin.generate()))
  console.log('DONE')
}

export default nestbars
