"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const Entity_1 = require("../data/Entity");
const Field_1 = require("../data/Field");
exports.makeEntityDecoratorFactory = () => (options = {}) => ({ name }) => Entity_1.Entity.add(new Entity_1.Entity(name, options));
exports.makeFieldDecoratorFactory = (type, OptionsClass) => (options = {}) => (_, name) => Field_1.Field.add(new Field_1.Field(name, type, Object.assign(new OptionsClass(), options)));
exports.makeSetFieldDecoratorFactory = (type) => (values, tsName, options = {}) => (_, name) => Field_1.Field.add(new Field_1.Field(name, type, Object.assign(new decorators_1.SetOptions(), options, { values, name: tsName })));
exports.makeRelationDecoratorFactory = (type) => (withEntity, withField) => (_, name) => Field_1.Field.add(new Field_1.Field(name, type, Object.assign(new decorators_1.RelationOptions(), {
    withEntity,
    withField,
})));
exports.makeJoinColumnRelationDecoratorFactory = (type) => (withEntity, withField, joinColumn = false) => (_, name) => Field_1.Field.add(new Field_1.Field(name, type, Object.assign(new decorators_1.RelationOptions(), {
    withEntity,
    withField,
    joinColumn,
})));
exports.makeJoinTableRelationDecoratorFactory = (type) => (withEntity, withField, joinTable = false) => (_, name) => Field_1.Field.add(new Field_1.Field(name, type, Object.assign(new decorators_1.RelationOptions(), {
    withEntity,
    withField,
    joinTable,
})));
//# sourceMappingURL=utils.js.map