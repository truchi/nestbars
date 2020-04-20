"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity = ({ entities: entitiesDest, services: servicesDest, }) => (entities, resolversDest) => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => {
        const entityDest = utils_1.toPathFunction(entitiesDest, Plugin_1.ANCHORS)('entity', entity.name);
        const serviceDest = utils_1.toPathFunction(servicesDest, Plugin_1.ANCHORS)('service', entity.name);
        const resolverDest = resolversDest('resolver', entity.name);
        const entityPath = utils_1.relativeImport(resolverDest, entityDest);
        const servicePath = utils_1.relativeImport(resolverDest, serviceDest);
        const gqlImports = [
            'Resolver',
            'Query',
            'Mutation',
            'Args',
            ...(entity.byType(decorators_1.FieldType.Int).length ? ['Int'] : ['']),
            ...(entity.byType(decorators_1.FieldType.Float).length ? ['Float'] : ['']),
        ];
        return {
            entityPath,
            servicePath,
            gqlImports,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map