"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
exports.TypeFactory = (type, name) => ({
    type,
    deps: [],
    ts: (() => {
        switch (type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Float:
            case decorators_1.FieldType.Version:
                return 'number';
            case decorators_1.FieldType.String:
            case decorators_1.FieldType.Uuid:
                return 'string';
            case decorators_1.FieldType.Date:
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
                return 'Date';
            case decorators_1.FieldType.Boolean:
                return 'boolean';
            case decorators_1.FieldType.Enum:
            case decorators_1.FieldType.OneToOne:
            case decorators_1.FieldType.ManyToOne:
                return name;
            case decorators_1.FieldType.Set:
            case decorators_1.FieldType.OneToMany:
            case decorators_1.FieldType.ManyToMany:
                return `${name}[]`;
            default:
                return assertNever(type);
        }
    })(),
    db: (() => {
        switch (type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Version:
                return 'int';
            case decorators_1.FieldType.Float:
                return 'float';
            case decorators_1.FieldType.String:
            case decorators_1.FieldType.Uuid:
                return 'varchar';
            case decorators_1.FieldType.Date:
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
                return 'date';
            case decorators_1.FieldType.Boolean:
                return 'boolean';
            case decorators_1.FieldType.Enum:
                return 'enum';
            case decorators_1.FieldType.Set:
                return 'set';
            case decorators_1.FieldType.OneToOne:
            case decorators_1.FieldType.OneToMany:
            case decorators_1.FieldType.ManyToOne:
            case decorators_1.FieldType.ManyToMany:
                return name;
            default:
                return assertNever(type);
        }
    })(),
    gql: (() => {
        switch (type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Version:
                return 'Int';
            case decorators_1.FieldType.Float:
                return 'Float';
            case decorators_1.FieldType.String:
            case decorators_1.FieldType.Uuid:
                return 'String';
            case decorators_1.FieldType.Date:
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
                return 'Date';
            case decorators_1.FieldType.Boolean:
                return 'Boolean';
            case decorators_1.FieldType.Enum:
            case decorators_1.FieldType.OneToOne:
            case decorators_1.FieldType.ManyToOne:
                return name;
            case decorators_1.FieldType.Set:
            case decorators_1.FieldType.OneToMany:
            case decorators_1.FieldType.ManyToMany:
                return `[${name}]`;
            default:
                return assertNever(type);
        }
    })(),
});
const assertNever = (x) => {
    throw new Error('Missing case for: ' + x);
};
//# sourceMappingURL=Type.js.map