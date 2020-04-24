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
    const getDtoPath = dtosPath('get.dto', entity.name);
    const createDtoPath = dtosPath('create.dto', entity.name);
    const updateDtoPath = dtosPath('update.dto', entity.name);
    const primaryFields = entity.fields.filter(field => field.data().isPrimary);
    const dataFields = entity.fields.filter(field => field.data().isData);
    const bothFields = [...primaryFields, ...dataFields];
    const primaryHasInt = has('isGqlInt', primaryFields);
    const primaryHasFloat = has('isGqlFloat', primaryFields);
    const primaryRelations = relations(primaryFields);
    const primaryEnums = enums(primaryFields);
    const dataHasInt = has('isGqlInt', dataFields);
    const dataHasFloat = has('isGqlFloat', dataFields);
    const dataRelations = relations(dataFields);
    const dataEnums = enums(dataFields);
    const bothRelations = relations(bothFields);
    const bothHasInt = has('isGqlInt', bothFields);
    const bothHasFloat = has('isGqlFloat', bothFields);
    const bothEnums = enums(bothFields);
    return {
        ...data,
        getDtoPath,
        createDtoPath,
        updateDtoPath,
        primaryFields,
        dataFields,
        primaryHasInt,
        primaryHasFloat,
        primaryRelations,
        primaryEnums,
        dataHasInt,
        dataHasFloat,
        dataRelations,
        dataEnums,
        bothHasInt,
        bothHasFloat,
        bothRelations,
        bothEnums,
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