import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { toPathFunction } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'
import entity from './entity'

export type ResolverPluginOptions = {
  entities: string | PathFunction
  dtos: string | PathFunction
  services: string | PathFunction
}

export default ({
  entities: entitiesPath,
  dtos: dtosPath,
  services: servicesPath,
}: ResolverPluginOptions): Plugin =>
  //
  (entities: Entity[], resolversPath: PathFunction): PluginOptions => ({
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    data: {
      entity: entity(
        toPathFunction(entitiesPath, ANCHORS),
        toPathFunction(dtosPath, ANCHORS),
        toPathFunction(servicesPath, ANCHORS),
        resolversPath,
      ),
    },
  })
