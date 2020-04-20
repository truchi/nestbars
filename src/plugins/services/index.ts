import { Plugin, PluginOptions } from '../../types/nestbars'
import { GeneratedFields } from '../../types/decorators'
import { PathFunction } from '../../types/utils'
import { toPathFunction, relativeImport } from '../../lib/utils'
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

        return {
          entityDest,
          serviceDest,
          importPath,
          generatedFields,
        }
      },
    })

export default entity
