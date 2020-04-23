"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const entity_1 = __importDefault(require("../entities/entity"));
exports.default = (entitiesPath, dtosPath) => (type, entity) => {
    const createDtoPath = dtosPath('create.dto', entity.name);
    const updateDtoPath = dtosPath('update.dto', entity.name);
    const dataRelations = utils_1.unique(entity.fields
        .filter(field => field.is(decorators_1.RelationOptions) && field.data().isData)
        .map(field => field.data().relation));
    const dataEnums = utils_1.unique(entity
        .by(decorators_1.SetOptions)
        .filter(field => field.data().isData)
        .map(({ options }) => options.name));
    return {
        ...entity_1.default(entitiesPath)('entity', entity),
        createDtoPath,
        updateDtoPath,
        dataRelations,
        dataEnums,
    };
};
//# sourceMappingURL=entity.js.map