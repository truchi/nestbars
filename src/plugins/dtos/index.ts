import { Plugin, PluginOptions } from '../../types/nestbars'
import { PathFunction } from '../../types/utils'
import { toPathFunction } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'
import entity from './entity'
import field from './field'

export type DtoPluginOptions = {
  entities: string | PathFunction
}

export default ({ entities: entitiesPath }: DtoPluginOptions): Plugin =>
  //
  (entities: Entity[], dtosPath: PathFunction): PluginOptions => ({
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    data: {
      entity: entity(toPathFunction(entitiesPath, ANCHORS), dtosPath),
      field,
    },
  })
