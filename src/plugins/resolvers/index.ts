import { Plugin, PluginOptions } from '../../types/nestbars'
import { Class, PathFunction } from 'src/types/utils'

const entity: Plugin = (): PluginOptions => ({
  name: 'Nestbars Resolvers Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  context: (entities: Class[], dest: PathFunction) =>
    entities.reduce(
      (o, { name }) => ({ ...o, [name]: dest('entity', name) }),
      {},
    ),
})

export default entity
