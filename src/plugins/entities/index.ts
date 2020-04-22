import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { Entity } from '../../lib/data/Entity'
import fieldData from './fieldData'
import entityData from './entityData'

export default ((entities: Entity[], path: PathFunction): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  entityData: entityData(path),
  fieldData,
})) as Plugin
