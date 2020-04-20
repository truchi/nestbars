"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
exports.default = ({ entities: entitiesPath }) => (entities, servicesPath) => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => ({
        entityPath: utils_1.toPathFunction(entitiesPath, Plugin_1.ANCHORS)('entity', entity.name),
        servicePath: servicesPath('service', entity.name),
        dependencies: [
            entity.name,
            ...entity
                .byType(decorators_1.FieldType.Enum, decorators_1.FieldType.Set)
                .map(field => field.options.name),
        ],
        primaryFields: utils_1.uniqueBy('name')([
            ...entity.byType(decorators_1.FieldType.Id, decorators_1.FieldType.Uuid),
            ...entity.filter(({ options }) => options.primary),
        ]),
        dataFields: utils_1.uniqueBy('name')(entity.byType(...decorators_1.DataFields)),
    }),
});
//# sourceMappingURL=index.js.map