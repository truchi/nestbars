"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entitiesPath, servicesPath) => (entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    servicePath: servicesPath('service', entity.name),
});
//# sourceMappingURL=entityData.js.map