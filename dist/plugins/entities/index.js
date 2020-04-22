"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fieldData_1 = __importDefault(require("./fieldData"));
const entityData_1 = __importDefault(require("./entityData"));
exports.default = ((entities, path) => ({
    name: 'Nestbars Entities Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: entityData_1.default(path),
    fieldData: fieldData_1.default,
}));
//# sourceMappingURL=index.js.map