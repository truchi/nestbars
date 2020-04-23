"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entitiesPath, servicesPath) => (type, entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    servicePath: servicesPath('service', entity.name),
});
//# sourceMappingURL=entity.js.map