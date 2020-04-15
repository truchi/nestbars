"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const Field_1 = require("./Field");
class OneToOneField extends Field_1.Field {
    constructor(entity, name, withEntity, withField, joinColumn) {
        super(entity, name, OneToOneField.options, OneToOneField.type);
        this.entity = entity;
        this.name = name;
        this.withEntity = withEntity;
        this.withField = withField;
        this.joinColumn = joinColumn;
    }
    tsType() {
        return this.withEntity().name;
    }
    dbType() {
        return this.withEntity().name;
    }
    gqlType() {
        return this.withEntity().name;
    }
    dependencies() {
        return [this.withEntity().name];
    }
}
exports.OneToOneField = OneToOneField;
OneToOneField.options = {};
OneToOneField.type = decorators_1.FieldType.OneToOne;
//# sourceMappingURL=OneToOneField.js.map