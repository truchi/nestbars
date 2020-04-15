"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("./utils");
const data_1 = require("../data");
exports.Id = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Id, data_1.PrimaryField);
exports.Uuid = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Uuid, data_1.PrimaryField);
//# sourceMappingURL=PrimaryFields.js.map