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
    entityData: (entity) => {
        const { name, options } = entity;
        const dbOptions = Object.assign(utils_1.pick(options, ['name']), options.options);
        const gqlOptions = utils_1.pick(options, ['description']);
        const hasInt = !!entity.byType(decorators_1.FieldType.Int).length;
        const hasFloat = !!entity.byType(decorators_1.FieldType.Float).length;
        const hasEnum = !!entity.byType(decorators_1.FieldType.Enum, decorators_1.FieldType.Set).length;
        const hasJoinColumn = !!entity
            .byType(decorators_1.FieldType.OneToOne, decorators_1.FieldType.ManyToOne)
            .filter(({ options }) => !!options.joinColumn)
            .length;
        const hasJoinTable = !!entity
            .byType(decorators_1.FieldType.ManyToMany)
            .filter(({ options }) => !!options.joinTable)
            .length;
        return {
            dbDecorator: 'Entity',
            gqlDecorator: 'ObjectType',
            dbOptions,
            gqlOptions,
            dest: dest('entity', name),
            hasInt,
            hasFloat,
            hasEnum,
            hasJoinColumn,
            hasJoinTable,
        };
    },
    fieldData: (field) => {
        const { type, options } = field;
        const name = field.relatesTo();
        const { dbDecorator, gqlDecorator } = toDecorators_1.default(type);
        const { dbType, gqlType } = toTypes_1.default(type, name);
        const { dbOptions, gqlOptions } = toOptions_1.default(options, dbType);
        return {
            dbDecorator,
            gqlDecorator,
            dbType,
            gqlType,
            dbOptions,
            gqlOptions,
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map