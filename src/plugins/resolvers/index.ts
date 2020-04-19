import { Plugin, PluginOptions } from '../../types/nestbars'
import { PathFunction } from 'src/types/utils'
import { Entity } from '../../lib/data/Entity'

const entity: Plugin = (
  entities: Entity[],
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
