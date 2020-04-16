import { Plugin, PluginOptions } from '../../types/nestbars'

const entity: Plugin = (): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
})

export default entity
