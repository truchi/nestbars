"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entitiesPath, dtosPath, servicesPath) => (type, entity) => {
    const primaryFields = entity.fields.filter(field => field.data().isPrimary);
    return {
        entityPath: entitiesPath('entity', entity.name),
        getDtoPath: dtosPath('get.dto', entity.name),
        createDtoPath: dtosPath('create.dto', entity.name),
        updateDtoPath: dtosPath('update.dto', entity.name),
        servicePath: servicesPath('service', entity.name),
    };
};
//# sourceMappingURL=entity copy.js.map