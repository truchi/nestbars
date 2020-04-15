"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
class Field {
    constructor(entity, name, options, type) {
        this.entity = entity;
        this.name = name;
        this.options = options;
        this.type = type;
    }
    tsType() {
        switch (this.type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Version:
            case decorators_1.FieldType.Float:
                return 'number';
            case decorators_1.FieldType.Uuid:
            case decorators_1.FieldType.String:
                return 'string';
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
            case decorators_1.FieldType.Date:
                return 'Date';
            case decorators_1.FieldType.Boolean:
                return 'boolean';
        }
    }
    dbType() {
        switch (this.type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Version:
            case decorators_1.FieldType.Float:
                return 'int';
            case decorators_1.FieldType.Uuid:
            case decorators_1.FieldType.String:
                return 'varchar';
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
            case decorators_1.FieldType.Date:
                return 'date';
            case decorators_1.FieldType.Boolean:
                return 'boolean';
            case decorators_1.FieldType.Enum:
                return 'enum';
            case decorators_1.FieldType.Set:
                return 'set';
        }
    }
    gqlType() {
        switch (this.type) {
            case decorators_1.FieldType.Id:
            case decorators_1.FieldType.Int:
            case decorators_1.FieldType.Version:
                return 'Int';
            case decorators_1.FieldType.Float:
                return 'Float';
            case decorators_1.FieldType.Uuid:
            case decorators_1.FieldType.String:
                return 'String';
            case decorators_1.FieldType.Created:
            case decorators_1.FieldType.Updated:
            case decorators_1.FieldType.Date:
                return 'Date';
            case decorators_1.FieldType.Boolean:
                return 'Boolean';
        }
    }
    dependencies() {
        return [];
    }
    dbOptions() {
        return { type: this.dbType() };
    }
    gqlOptions() {
        return {};
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map