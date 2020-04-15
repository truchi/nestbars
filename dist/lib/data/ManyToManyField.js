"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const Field_1 = require("./Field");
class ManyToManyField extends Field_1.Field {
    constructor(entity, name, withEntity, withField, joinTable) {
        super(entity, name, ManyToManyField.options, ManyToManyField.type);
        this.entity = entity;
        this.name = name;
        this.withEntity = withEntity;
        this.withField = withField;
        this.joinTable = joinTable;
    }
    tsType() {
        return this.withEntity().name + '[]';
    }
    dbType() {
        return this.withEntity().name;
    }
    gqlType() {
        return '[' + this.withEntity().name + ']';
    }
    dependencies() {
        return [this.withEntity().name];
    }
}
exports.ManyToManyField = ManyToManyField;
ManyToManyField.options = {};
ManyToManyField.type = decorators_1.FieldType.ManyToMany;
//# sourceMappingURL=ManyToManyField.js.map