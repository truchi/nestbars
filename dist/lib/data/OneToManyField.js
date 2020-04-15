"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const Field_1 = require("./Field");
class OneToManyField extends Field_1.Field {
    constructor(entity, name, withEntity, withField) {
        super(entity, name, OneToManyField.options, OneToManyField.type);
        this.entity = entity;
        this.name = name;
        this.withEntity = withEntity;
        this.withField = withField;
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
exports.OneToManyField = OneToManyField;
OneToManyField.options = {};
OneToManyField.type = decorators_1.FieldType.OneToMany;
//# sourceMappingURL=OneToManyField.js.map