"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("./entity"));
const field_1 = __importDefault(require("./field"));
exports.default = ((entities, path) => ({
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    data: {
        entity: entity_1.default(path),
        field: field_1.default,
    },
}));
//# sourceMappingURL=index.js.map