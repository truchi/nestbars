import { Plugin, PluginOptions } from '../../types/nestbars'
import { PathFunction } from '../../types/utils'
import { toPathFunction } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'
import entityData from './entityData'

export type ServicePluginOptions = {
  entities: string | PathFunction
}

export default ({ entities: entitiesPath }: ServicePluginOptions): Plugin =>
  //
  (entities: Entity[], servicesPath: PathFunction): PluginOptions => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: entityData(toPathFunction(entitiesPath, ANCHORS), servicesPath),
  })
