"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const entity_1 = __importDefault(require("../entities/entity"));
exports.default = (entitiesPath, dtosPath) => (type, entity) => {
    const data = entity_1.default(entitiesPath)('entity', entity);
    const createDtoPath = dtosPath('create.dto', entity.name);
    const updateDtoPath = dtosPath('update.dto', entity.name);
    const createFields = entity.fields.filter(field => field.data().isData);
    const updateFields = [
        ...entity.fields.filter(field => field.data().isPrimary),
        ...createFields,
    ];
    const createHasInt = has('isGqlInt', createFields);
    const createHasFloat = has('isGqlFloat', createFields);
    const updateHasInt = has('isGqlInt', updateFields);
    const updateHasFloat = has('isGqlFloat', updateFields);
    const createRelations = relations(createFields);
    const updateRelations = relations(updateFields);
    const createEnums = enums(createFields);
    const updateEnums = enums(updateFields);
    return {
        ...data,
        createDtoPath,
        updateDtoPath,
        createFields,
        updateFields,
        createHasInt,
        createHasFloat,
        updateHasInt,
        updateHasFloat,
        createRelations,
        updateRelations,
        createEnums,
        updateEnums,
    };
};
const relations = (fields) => utils_1.unique(fields
    .filter(field => field.is(decorators_1.RelationOptions))
    .map(field => field.data().relation));
const enums = (fields) => utils_1.unique(fields
    .filter(field => field.is(decorators_1.SetOptions))
    .map(({ options }) => options.name));
const has = (type, fields) => !!fields.filter(field => field.data()[type]).length;
//# sourceMappingURL=entity.js.map