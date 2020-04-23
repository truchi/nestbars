import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import entity from './entity'
import field from './field'

export default ((entities: Entity[], path: PathFunction): PluginOptions => ({
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  data: {
    entity: entity(path),
    field,
  },
})) as Plugin
