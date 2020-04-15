"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("./utils");
const data_1 = require("../data");
exports.Int = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Int, data_1.ScalarField);
exports.Float = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Float, data_1.ScalarField);
exports.String = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.String, data_1.ScalarField);
exports.Date = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Date, data_1.ScalarField);
exports.Boolean = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Boolean, data_1.ScalarField);
//# sourceMappingURL=ScalarFields.js.map