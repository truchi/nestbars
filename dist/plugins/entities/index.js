"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const toOptions_1 = __importDefault(require("./lib/toOptions"));
const toDecorators_1 = __importDefault(require("./lib/toDecorators"));
exports.default = ((entities, path) => ({
    name: 'Nestbars Entities Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: (entity) => {
        const { name, fields, options } = entity;
        const enums = entity.by(decorators_1.FieldType.Enum, decorators_1.FieldType.Set);
        const joins = entity.by(decorators_1.FieldType.OneToOne, decorators_1.FieldType.ManyToOne, decorators_1.FieldType.ManyToMany);
        const hasInt = !!entity.by(decorators_1.FieldType.Int).length;
        const hasFloat = !!entity.by(decorators_1.FieldType.Float).length;
        const hasEnum = !!enums.length;
        const hasJoinColumn = !!joins.filter(({ options }) => !!options.joinColumn).length;
        const hasJoinTable = !!joins.filter(({ options }) => !!options.joinTable).length;
        return {
            path: path('entity', name),
            dbDecorator: 'Entity',
            gqlDecorator: 'ObjectType',
            dbOptions: Object.assign(utils_1.pick(options, ['name']), options.options),
            gqlOptions: utils_1.pick(options, ['description']),
            enums,
            dbImports: [
                'Entity',
                ...utils_1.unique(fields.map(field => field.data().dbDecorator)),
                ...(hasJoinColumn ? ['JoinColumn'] : []),
                ...(hasJoinTable ? ['JoinTable'] : []),
            ].sort(),
            gqlImports: [
                'ObjectType',
                ...utils_1.unique(fields.map(field => field.data().gqlDecorator)),
                ...(hasInt ? ['Int'] : []),
                ...(hasFloat ? ['Float'] : []),
                ...(hasEnum ? ['registerEnumType'] : []),
            ].sort(),
        };
    },
    fieldData: (field) => {
        const { type, options } = field;
        const { dbDecorator, gqlDecorator } = toDecorators_1.default(type);
        const { dbOptions, gqlOptions } = toOptions_1.default(options, field.dbType);
        return {
            dbDecorator,
            gqlDecorator,
            dbOptions,
            gqlOptions,
        };
    },
}));
//# sourceMappingURL=index.js.map