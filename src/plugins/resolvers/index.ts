import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { FieldType } from '../../types/decorators'
import { toPathFunction, relativeImport, uniqueBy } from '../../lib/utils'
import { Entity } from '../../lib/data/Entity'
import { ANCHORS } from '../../lib/plugins/Plugin'

export type ResolverPluginOptions = {
  entities: string | PathFunction
  services: string | PathFunction
}

const entity = ({
  entities: entitiesDest,
  services: servicesDest,
}: ResolverPluginOptions): Plugin =>
  //
  (entities: Entity[], resolversDest: PathFunction): PluginOptions => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity: Entity): object => {
      const entityDest = toPathFunction(entitiesDest, ANCHORS)(
        'entity',
        entity.name,
      )
      const serviceDest = toPathFunction(servicesDest, ANCHORS)(
        'service',
        entity.name,
      )
      const resolverDest = resolversDest('resolver', entity.name)

      const entityPath = relativeImport(resolverDest, entityDest)
      const servicePath = relativeImport(resolverDest, serviceDest)
      const gqlImports = [
        'Resolver',
        'Query',
        'Mutation',
        'Args',
        ...(entity.byType(FieldType.Int).length ? ['Int'] : ['']),
        ...(entity.byType(FieldType.Float).length ? ['Float'] : ['']),
      ]

      return {
        entityPath,
        servicePath,
        gqlImports,
      }
    },
  })

export default entity
