"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("./utils");
const data_1 = require("../data");
exports.Created = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Created, data_1.SpecialField);
exports.Updated = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Updated, data_1.SpecialField);
exports.Version = utils_1.makeFieldDecoratorFactory(decorators_1.FieldType.Version, data_1.SpecialField);
//# sourceMappingURL=SpecialFields.js.map