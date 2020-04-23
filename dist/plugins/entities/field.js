"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toOptions_1 = __importDefault(require("./toOptions"));
const toDecorators_1 = __importDefault(require("./toDecorators"));
exports.default = (type, field) => ({
    ...toDecorators_1.default(field),
    ...toOptions_1.default(field),
});
//# sourceMappingURL=field.js.map