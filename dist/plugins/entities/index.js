"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const helpers_1 = __importDefault(require("./helpers"));
const toTypes_1 = __importDefault(require("./lib/toTypes"));
const toOptions_1 = __importDefault(require("./lib/toOptions"));
const toDecorators_1 = __importDefault(require("./lib/toDecorators"));
const entity = (entities, dest) => ({
    name: 'Nestbars Entities Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    helpers: helpers_1.default,
    entityData: ({ name, options }) => {
        const dbOptions = Object.assign(utils_1.pick(options, ['name']), options.options);
        const gqlOptions = utils_1.pick(options, ['description']);
        return {
            dbDecorator: 'Entity',
            gqlDecorator: 'ObjectType',
            dbOptions,
            gqlOptions,
            dest: dest('entity', name),
        };
    },
    fieldData: ({ type, options }) => {
        const name = options instanceof decorators_1.SetOptions
            ? options.name
            : options instanceof decorators_1.RelationOptions
                ? options.withEntity().name
                : '';
        const { dbDecorator, gqlDecorator } = toDecorators_1.default(type);
        const { tsType, dbType, gqlType } = toTypes_1.default(type, name);
        const { dbOptions, gqlOptions } = toOptions_1.default(options);
        return {
            dbDecorator,
            gqlDecorator,
            tsType,
            gqlType,
            dbOptions: { type: dbType, ...dbOptions },
            gqlOptions,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map