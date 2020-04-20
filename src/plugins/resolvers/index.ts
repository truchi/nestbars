import { PathFunction } from '../../types/utils'
import { Plugin, PluginOptions } from '../../types/nestbars'
import { FieldType } from '../../types/decorators'
import { toPathFunction } from '../../lib/utils'
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
    entityData: (entity: Entity): object => ({
      entityDest: toPathFunction(entitiesDest, ANCHORS)('entity', entity.name),
      serviceDest: toPathFunction(servicesDest, ANCHORS)(
        'service',
        entity.name,
      ),
      resolverDest: resolversDest('resolver', entity.name),
      gqlImports: [
        'Resolver',
        'Query',
        'Mutation',
        'Args',
        ...(entity.byType(FieldType.Int).length ? ['Int'] : []),
        ...(entity.byType(FieldType.Float).length ? ['Float'] : []),
      ].sort(),
    }),
  })

export default entity
