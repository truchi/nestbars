"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
exports.default = (entitiesPath, dtosPath) => (type, entity) => ({
    entityPath: entitiesPath('entity', entity.name),
    createDtoPath: dtosPath('create.dto', entity.name),
    updateDtoPath: dtosPath('update.dto', entity.name),
    dataRelations: utils_1.unique(entity.fields
        .filter(field => field.is(decorators_1.RelationOptions) && field.isData)
        .map(({ relation }) => relation)),
    dataEnums: utils_1.unique(entity
        .by(decorators_1.SetOptions)
        .filter(({ isData }) => isData)
        .map(({ options }) => options.name)),
});
//# sourceMappingURL=entity.js.map