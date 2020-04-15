"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Field_1 = require("./Field");
class SpecialField extends Field_1.Field {
    constructor(entity, name, options, type) {
        super(entity, name, options, type);
        this.entity = entity;
        this.name = name;
        this.options = options;
        this.type = type;
    }
    dbOptions() {
        const { options: { primary, description }, } = this;
        return utils_1.assign(super.dbOptions(), { primary, comment: description }, this.options.options);
    }
    gqlOptions() {
        const { options: { description, deprecation }, } = this;
        return utils_1.assign(super.gqlOptions(), {
            description,
            deprecationReason: deprecation,
        }, this.options.options);
    }
}
exports.SpecialField = SpecialField;
//# sourceMappingURL=SpecialField.js.map