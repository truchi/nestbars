"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity = ({ entities: entitiesDest }) => (entities, servicesDest) => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => {
        const entityDest = utils_1.toPathFunction(entitiesDest, Plugin_1.ANCHORS)('entity', entity.name);
        const serviceDest = servicesDest('service', entity.name);
        const importPath = utils_1.relativeImport(serviceDest, entityDest);
        return {
            entityDest,
            serviceDest,
            importPath,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map