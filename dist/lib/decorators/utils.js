"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const data_1 = require("../data");
exports.makeEntityDecoratorFactory = () => (options = {}) => ({ name }) => data_1.Entity.add(new data_1.Entity(name, options));
exports.makeFieldDecoratorFactory = (type) => (options = {}) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new data_1.Field(entity, name, type, options));
exports.makeSetFieldDecoratorFactory = (type) => (values, tsName, options = {}) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new data_1.Field(entity, name, type, utils_1.assign(options, { values, name: tsName })));
exports.makeRelationDecoratorFactory = (type) => (withEntity, withField) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new data_1.Field(entity, name, type, {
    withEntity,
    withField,
}));
exports.makeJoinColumnRelationDecoratorFactory = (type) => (withEntity, withField, joinColumn = false) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new data_1.Field(entity, name, type, {
    withEntity,
    withField,
    joinColumn,
}));
exports.makeJoinTableRelationDecoratorFactory = (type) => (withEntity, withField, joinTable = false) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new data_1.Field(entity, name, type, {
    withEntity,
    withField,
    joinTable,
}));
//# sourceMappingURL=utils.js.map