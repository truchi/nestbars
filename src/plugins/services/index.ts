import { Plugin, PluginOptions } from '../../types/nestbars'
import { FieldType, DataFields } from '../../types/decorators'
import { PathFunction } from '../../types/utils'
import { toPathFunction, uniqueBy } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'

export type ServicePluginOptions = {
  entities: string | PathFunction
}

const entity = ({ entities: entitiesDest }: ServicePluginOptions): Plugin =>
  //
  (entities: Entity[], servicesDest: PathFunction): PluginOptions => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity: Entity): object => ({
      entityDest: toPathFunction(entitiesDest, ANCHORS)('entity', entity.name),
      serviceDest: servicesDest('service', entity.name),
      dependencies: [
        entity.name,
        ...entity
          .byType(FieldType.Enum, FieldType.Set)
          .map(field => (field.options as any).name),
      ],
      primaryFields: uniqueBy('name')([
        ...entity.byType(FieldType.Id, FieldType.Uuid),
        ...entity.filter(({ options }) => (options as any).primary),
      ]),
      dataFields: uniqueBy('name')(entity.byType(...DataFields)),
    }),
  })

export default entity
