import { Plugin, PluginOptions } from '../../types/nestbars'
import { GeneratedFields, FieldType, DataFields } from '../../types/decorators'
import { PathFunction } from '../../types/utils'
import { toPathFunction, relativeImport, uniqueBy } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'

export type ServiceOptions = {
  entities: string | PathFunction
}

const entity: (options: ServiceOptions) => Plugin =
  //
  ({ entities: entitiesDest }: ServiceOptions) =>
    //
    (entities: Entity[], servicesDest: PathFunction): PluginOptions => ({
      name: 'Nestbars Services Plugin',
      templates: (__dirname + '/templates').replace('/dist/', '/src/'),
      entityData: (entity: Entity): object => {
        const entityDest = toPathFunction(entitiesDest, ANCHORS)(
          'entity',
          entity.name,
        )
        const serviceDest = servicesDest('service', entity.name)
        const importPath = relativeImport(serviceDest, entityDest)
        const generatedFields = entity.byType(...GeneratedFields)
        const primaryFields = uniqueBy('name')([
          ...entity.byType(FieldType.Id, FieldType.Uuid),
          ...entity.filter(({ options }) => (options as any).primary),
        ])
        const primaryObject =
          '{' + primaryFields.map(({ name }) => name).join(',') + '}'
        const dataFields = uniqueBy('name')(entity.byType(...DataFields))
        const dependencies = [
          entity.name,
          ...entity
            .byType(FieldType.Enum, FieldType.Set)
            .map(field => (field.options as any).name),
        ]

        return {
          entityDest,
          serviceDest,
          importPath,
          dependencies,
          generatedFields,
          primaryFields,
          // primaryObject,
          dataFields,
        }
      },
    })

export default entity
