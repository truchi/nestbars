"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entitiesPath, dtosPath, servicesPath, resolversPath) => (type, entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    getDtoPath: dtosPath('get.dto', entity.name),
    createDtoPath: dtosPath('create.dto', entity.name),
    updateDtoPath: dtosPath('update.dto', entity.name),
    servicePath: servicesPath('service', entity.name),
    resolverPath: resolversPath('resolver', entity.name),
});
//# sourceMappingURL=entity.js.map