import { Plugin, PluginOptions } from '../../types/nestbars'
import { Class, PathFunction } from 'src/types/utils'

const entity: Plugin = (
  entities: Class[],
  dest: PathFunction,
): PluginOptions => ({
  name: 'Nestbars Resolvers Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  context: () =>
    entities.reduce(
      (o, { name }) => ({ ...o, [name]: dest('resolver', name) }),
      {},
    ),
})

export default entity
