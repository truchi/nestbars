"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
exports.makeFieldDecoratorFactory = (type, Class) => (options = {}) => ({ constructor: { name: entity } }, name) => data_1.Field.add(new Class(entity, name, options, type));
exports.makeSetDecoratorFactory = (type) => (values, tsName, options = {}) => ({ constructor: { name: entity } }, name) => data_1.SetField.add(new data_1.SetField(entity, name, values, tsName, options, type));
//# sourceMappingURL=utils.js.map