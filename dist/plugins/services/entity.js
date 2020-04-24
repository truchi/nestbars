"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entitiesPath, dtosPath, servicesPath) => (type, entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    createDtoPath: dtosPath('create.dto', entity.name),
    updateDtoPath: dtosPath('update.dto', entity.name),
    servicePath: servicesPath('service', entity.name),
});
//# sourceMappingURL=entity.js.map