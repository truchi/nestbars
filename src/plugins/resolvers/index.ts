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
  entities: entitiesPath,
  services: servicesDest,
}: ResolverPluginOptions): Plugin =>
  //
  (entities: Entity[], resolversPath: PathFunction): PluginOptions => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity: Entity): object => ({
      entityPath: toPathFunction(entitiesPath, ANCHORS)('entity', entity.name),
      servicePath: toPathFunction(servicesDest, ANCHORS)(
        'service',
        entity.name,
      ),
      resolverPath: resolversPath('resolver', entity.name),
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
