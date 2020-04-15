"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Field_1 = require("./Field");
class ScalarField extends Field_1.Field {
    constructor(entity, name, options, type) {
        super(entity, name, options, type);
        this.entity = entity;
        this.name = name;
        this.options = options;
        this.type = type;
    }
    dbOptions() {
        const { options: { primary, unique, nullable, default: dflt, description }, } = this;
        return utils_1.assign(super.dbOptions(), {
            primary,
            unique,
            nullable,
            default: dflt,
            comment: description,
        }, this.options.options);
    }
    gqlOptions() {
        const { options: { nullable, default: dflt, description, deprecation }, } = this;
        return utils_1.assign(super.gqlOptions(), {
            nullable,
            defaultValue: dflt,
            description,
            deprecationReason: deprecation,
        }, this.options.options);
    }
}
exports.ScalarField = ScalarField;
//# sourceMappingURL=ScalarField.js.map