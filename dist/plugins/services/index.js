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
        const primaryFields = utils_1.uniqueBy('name')([
            ...entity.byType(decorators_1.FieldType.Id, decorators_1.FieldType.Uuid),
            ...entity.filter(({ options }) => options.primary),
        ]);
        const primaryObject = '{' + primaryFields.map(({ name }) => name).join(',') + '}';
        const dataFields = utils_1.uniqueBy('name')(entity.byType(...decorators_1.DataFields));
        const dependencies = [
            entity.name,
            ...entity
                .byType(decorators_1.FieldType.Enum, decorators_1.FieldType.Set)
                .map(field => field.options.name),
        ];
        return {
            entityDest,
            serviceDest,
            importPath,
            dependencies,
            generatedFields,
            primaryFields,
            dataFields,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map