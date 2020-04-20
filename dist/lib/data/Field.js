"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../utils");
let FIELD_DATA = {};
exports.get = (field) => FIELD_DATA[`${field.entity}:${field.name}`];
exports.set = (field, data) => void (FIELD_DATA[`${field.entity}:${field.name}`] = data);
exports.reset = () => void (FIELD_DATA = {});
class Field {
    constructor(entity, name, type, options) {
        this.entity = entity;
        this.name = name;
        this.type = type;
        this.options = options;
    }
    relatesTo() {
        return this.options instanceof decorators_1.SetOptions
            ? this.options.name
            : this.options instanceof decorators_1.RelationOptions
                ? this.options.withEntity().name
                : '';
    }
    tsType() {
        return tsType(this.type, this.relatesTo());
    }
    data() {
        return exports.get(this);
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
const tsType = (type, name) => {
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
            return name;
        case decorators_1.FieldType.OneToOne:
        case decorators_1.FieldType.ManyToOne:
            return name;
        case decorators_1.FieldType.Set:
        case decorators_1.FieldType.OneToMany:
        case decorators_1.FieldType.ManyToMany:
            return `${name}[]`;
        default:
            return utils_1.assertNever(type, __filename, 'tsType');
    }
};
//# sourceMappingURL=Field.js.map