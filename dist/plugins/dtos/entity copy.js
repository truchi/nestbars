"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("../entities/entity"));
exports.default = (entitiesPath, dtosPath) => (type, entity) => {
    return {
        ...entity_1.default(entitiesPath)('entity', entity),
    };
};
//# sourceMappingURL=entity copy.js.map