"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
exports.default = (type, field) => {
    const isPrimary = field.is(decorators_1.PrimaryOptions) || !!field.options.primary;
    return {
        isPrimary,
    };
};
//# sourceMappingURL=field.js.map