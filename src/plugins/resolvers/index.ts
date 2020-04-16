import { Plugin, PluginOptions } from '../../types/nestbars'

const entity: Plugin = (): PluginOptions => ({
  name: 'Nestbars Resolvers Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
})

export default entity
