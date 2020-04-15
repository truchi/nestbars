"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../utils");
const Field_1 = require("./Field");
class SetField extends Field_1.Field {
    constructor(entity, name, values, tsName, options, type) {
        super(entity, name, options, type);
        this.entity = entity;
        this.name = name;
        this.values = values;
        this.tsName = tsName;
        this.options = options;
        this.type = type;
    }
    tsType() {
        return this.type === decorators_1.FieldType.Enum ? this.tsName : this.tsName + '[]';
    }
    gqlType() {
        return this.type === decorators_1.FieldType.Enum ? this.tsName : '[' + this.tsName + ']';
    }
    dbOptions() {
        const { tsName, options: { primary, default: dflt, description }, } = this;
        return utils_1.assign(super.dbOptions(), {
            primary,
            enum: tsName,
            default: dflt,
            comment: description || undefined,
        }, this.options.options);
    }
    gqlOptions() {
        const { options: { default: dflt, description, deprecation }, } = this;
        return utils_1.assign(super.gqlOptions(), {
            defaultValue: dflt,
            description,
            deprecationReason: deprecation,
        }, this.options.options);
    }
}
exports.SetField = SetField;
//# sourceMappingURL=SetField.js.map