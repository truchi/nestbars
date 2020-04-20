"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity = ({ entities: entitiesDest }) => (entities, servicesDest) => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => {
        const entityDest = utils_1.toPathFunction(entitiesDest, Plugin_1.ANCHORS)('entity', entity.name);
        const serviceDest = servicesDest('service', entity.name);
        const importPath = utils_1.relativeImport(serviceDest, entityDest);
        const generatedFields = entity.byType(...decorators_1.GeneratedFields);
        return {
            entityDest,
            serviceDest,
            importPath,
            generatedFields,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map