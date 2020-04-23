"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
exports.default = (entitiesPath, servicesPath, resolversPath) => (type, entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    servicePath: servicesPath('service', entity.name),
    resolverPath: resolversPath('resolver', entity.name),
    hasInt: !!entity.by(decorators_1.FieldType.Int).length,
    hasFloat: !!entity.by(decorators_1.FieldType.Float).length,
});
//# sourceMappingURL=entity.js.map