"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
exports.OneToOne = (withEntity, withField, joinColumn) => ({ constructor: { name: entity } }, name) => data_1.OneToOneField.add(new data_1.OneToOneField(entity, name, withEntity, withField, joinColumn));
exports.OneToMany = (withEntity, withField) => ({ constructor: { name: entity } }, name) => data_1.OneToManyField.add(new data_1.OneToManyField(entity, name, withEntity, withField));
exports.ManyToOne = (withEntity, withField, joinColumn) => ({ constructor: { name: entity } }, name) => data_1.ManyToOneField.add(new data_1.ManyToOneField(entity, name, withEntity, withField, joinColumn));
exports.ManyToMany = (withEntity, withField, joinTable) => ({ constructor: { name: entity } }, name) => data_1.ManyToManyField.add(new data_1.ManyToManyField(entity, name, withEntity, withField, joinTable));
//# sourceMappingURL=RelationFields.js.map