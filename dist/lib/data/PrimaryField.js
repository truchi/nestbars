"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Field_1 = require("./Field");
class PrimaryField extends Field_1.Field {
    constructor(entity, name, options, type) {
        super(entity, name, options, type);
        this.entity = entity;
        this.name = name;
        this.options = options;
        this.type = type;
    }
    dbOptions() {
        const { options: { description }, } = this;
        return utils_1.assign(super.dbOptions(), { type: undefined }, { comment: description }, this.options.options);
    }
    gqlOptions() {
        const { options: { description, deprecation }, } = this;
        return utils_1.assign(super.gqlOptions(), {
            description,
            deprecationReason: deprecation,
        }, this.options.options);
    }
}
exports.PrimaryField = PrimaryField;
//# sourceMappingURL=PrimaryField.js.map