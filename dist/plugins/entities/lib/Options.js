"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../../types/decorators");
exports.default = (options, dbType) => ({
    dbOptions: (() => {
        if (options instanceof decorators_1.ScalarOptions) {
            return {};
        }
    })(),
    gqlOptions: {},
});
//# sourceMappingURL=Options.js.map