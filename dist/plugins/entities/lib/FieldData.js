"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../../types/decorators");
const toTypes_1 = __importDefault(require("./toTypes"));
const toOptions_1 = __importDefault(require("./toOptions"));
const toDecorators_1 = __importDefault(require("./toDecorators"));
class FieldData {
    constructor(field) {
        this.field = field;
        const { type, options } = field;
        const name = options instanceof decorators_1.SetOptions
            ? options.name
            : options instanceof decorators_1.RelationOptions
                ? options.withEntity().name
                : '';
        const { dbDecorator, gqlDecorator } = toDecorators_1.default(type);
        this.dbDecorator = dbDecorator;
        this.gqlOptions = gqlDecorator;
        const { tsType, dbType, gqlType } = toTypes_1.default(type, name);
        this.tsType = tsType;
        this.gqlType = gqlType;
        const { dbOptions, gqlOptions } = toOptions_1.default(options);
        this.dbOptions = { dbType, ...dbOptions };
        this.gqlOptions = gqlOptions;
    }
}
exports.FieldData = FieldData;
//# sourceMappingURL=FieldData.js.map