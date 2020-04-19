"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./context"));
const helpers_1 = __importDefault(require("./helpers"));
const entity = (entities, dest) => ({
    name: 'Nestbars Entities Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    context: context_1.default(entities, dest),
    helpers: helpers_1.default(entities, dest),
});
exports.default = entity;
//# sourceMappingURL=index.js.map