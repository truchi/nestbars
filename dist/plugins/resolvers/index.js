"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity = ({ entities: entitiesDest, services: servicesDest, }) => (entities, resolversDest) => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => ({
        entityDest: utils_1.toPathFunction(entitiesDest, Plugin_1.ANCHORS)('entity', entity.name),
        serviceDest: utils_1.toPathFunction(servicesDest, Plugin_1.ANCHORS)('service', entity.name),
        resolverDest: resolversDest('resolver', entity.name),
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
exports.default = entity;
//# sourceMappingURL=index.js.map