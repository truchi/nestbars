"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const Entity_1 = require("../../lib/data/Entity");
const toTypes_1 = __importDefault(require("./lib/toTypes"));
const toDecorators_1 = __importDefault(require("./lib/toDecorators"));
const toOptions_1 = __importDefault(require("./lib/toOptions"));
exports.default = (type, field) => {
    let name = '';
    let relation;
    if (field.options instanceof decorators_1.SetOptions) {
        name = field.options.name;
    }
    else if (field.options instanceof decorators_1.RelationOptions) {
        name = field.options.withEntity().name;
        relation = Entity_1.Entity.find(name);
    }
    const types = toTypes_1.default(field, name);
    const decorators = toDecorators_1.default(field);
    const options = toOptions_1.default(field, types.dbType);
    const isGqlInt = types.gqlType === 'Int';
    const isGqlFloat = types.gqlType === 'Float';
    const hasJoinColumn = !!field.options.joinColumn;
    const hasJoinTable = !!field.options.joinTable;
    return {
        ...types,
        ...decorators,
        ...options,
        relation,
        hasJoinColumn,
        hasJoinTable,
        isGqlInt,
        isGqlFloat,
    };
};
//# sourceMappingURL=field.js.map