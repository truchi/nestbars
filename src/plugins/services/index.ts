import { Plugin, PluginOptions } from '../../types/nestbars'
import { PathFunction } from 'src/types/utils'
import { toPathFunction } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'

export type ServiceOptions = {
  entities: string | PathFunction
}

const entity: (options: ServiceOptions) => Plugin =
  //
  ({ entities: entitiesDest }: ServiceOptions) =>
    //
    (entities: Entity[], dest: PathFunction): PluginOptions => ({
      name: 'Nestbars Services Plugin',
      templates: (__dirname + '/templates').replace('/dist/', '/src/'),
      context: () =>
        entities.reduce(
          (o, { name }) => ({
            ...o,
            [name]: {
              dest: dest('service', name),
              entityDest: toPathFunction(entitiesDest, ANCHORS)('entity', name),
            },
          }),
          {},
        ),
    })

export default entity
