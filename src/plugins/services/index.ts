import { Plugin, PluginOptions } from '../../types/nestbars'
import { FieldType } from '../../types/decorators'
import { PathFunction } from '../../types/utils'
import { toPathFunction, uniqueBy } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'

export type ServicePluginOptions = {
  entities: string | PathFunction
}

export default ({ entities: entitiesPath }: ServicePluginOptions): Plugin =>
  //
  (entities: Entity[], servicesPath: PathFunction): PluginOptions => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity: Entity): object => ({
      entityPath: toPathFunction(entitiesPath, ANCHORS)('entity', entity.name),
      servicePath: servicesPath('service', entity.name),
      dependencies: [
        entity.name,
        ...entity
          .by(FieldType.Enum, FieldType.Set)
          .map(field => (field.options as any).name),
      ],
      primaryFields: uniqueBy('name')([
        ...entity.by(FieldType.Id, FieldType.Uuid),
        ...entity.filter(({ options }) => (options as any).primary),
      ]),
      dataFields: uniqueBy('name')(entity.by(FieldType.Int)), // FIXME
    }),
  })
