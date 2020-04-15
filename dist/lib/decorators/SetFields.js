"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("./utils");
exports.Enum = utils_1.makeSetDecoratorFactory(decorators_1.FieldType.Enum);
exports.Set = utils_1.makeSetDecoratorFactory(decorators_1.FieldType.Enum);
//# sourceMappingURL=SetFields.js.map