"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = __importDefault(require("../entities/field"));
exports.default = (type, field) => ({
    ...field_1.default('entity', field),
});
//# sourceMappingURL=field.js.map