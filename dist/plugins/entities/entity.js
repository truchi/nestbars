"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const toDecorators_1 = __importDefault(require("./toDecorators"));
exports.default = (path) => (type, entity) => ({
    path: path('entity', entity.name),
    fieldDbDecorators: utils_1.unique(entity.fields.map(field => toDecorators_1.default(field).dbDecorator)),
    enums: entity.by(decorators_1.SetOptions),
    relations: utils_1.unique(entity.by(decorators_1.RelationOptions).map(({ relation }) => relation)),
    hasInt: !!entity.by(decorators_1.FieldType.Int).length,
    hasFloat: !!entity.by(decorators_1.FieldType.Float).length,
    hasJoinColumn: !!entity.fields.filter(({ hasJoinColumn }) => hasJoinColumn)
        .length,
    hasJoinTable: !!entity.fields.filter(({ hasJoinTable }) => hasJoinTable)
        .length,
    hasFields: entity.fields.length,
    dbOptions: Object.assign(utils_1.pick(entity.options, ['name']), entity.options.options),
    gqlOptions: utils_1.pick(entity.options, ['description']),
});
//# sourceMappingURL=entity.js.map