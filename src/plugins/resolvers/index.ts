import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { toPathFunction } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'
import entityData from './entityData'

export type ResolverPluginOptions = {
  entities: string | PathFunction
  services: string | PathFunction
}

export default ({
  entities: entitiesPath,
  services: servicesPath,
}: ResolverPluginOptions): Plugin =>
  //
  (entities: Entity[], resolversPath: PathFunction): PluginOptions => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: entityData(
      toPathFunction(entitiesPath, ANCHORS),
      toPathFunction(servicesPath, ANCHORS),
      resolversPath,
    ),
  })
