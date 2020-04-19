import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { Entity } from '../../lib/data/Entity'
import { Field } from '../../lib/data/Field'
import context from './context'
import helpers from './helpers'

const entity: Plugin = (
  entities: Entity[],
  dest: PathFunction,
): PluginOptions => ({
  name: 'Nestbars Entities Plugin',
  templates: (__dirname + '/templates').replace('/dist/', '/src/'),
  context: context(entities, dest),
  helpers,
  entityData: (entity: Entity) => entity.name,
  fieldData: (field: Field) => field.name,
})

export default entity
