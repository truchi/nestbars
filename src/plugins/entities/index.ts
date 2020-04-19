import { Class, PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import context from './context'
import helpers from './helpers'

const entity: Plugin = (
  entities: Class[],
  dest: PathFunction,
): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  context: context(entities, dest),
  helpers: helpers(entities, dest),
})

export default entity
