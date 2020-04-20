"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
exports.default = ({ entities: entitiesPath, services: servicesDest, }) => (entities, resolversPath) => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => ({
        entityPath: utils_1.toPathFunction(entitiesPath, Plugin_1.ANCHORS)('entity', entity.name),
        servicePath: utils_1.toPathFunction(servicesDest, Plugin_1.ANCHORS)('service', entity.name),
        resolverPath: resolversPath('resolver', entity.name),
        gqlImports: [
            'Resolver',
            'Query',
            'Mutation',
            'Args',
            ...(entity.byType(decorators_1.FieldType.Int).length ? ['Int'] : []),
            ...(entity.byType(decorators_1.FieldType.Float).length ? ['Float'] : []),
        ].sort(),
    }),
});
//# sourceMappingURL=index.js.map