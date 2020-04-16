"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plugin_1 = __importDefault(require("./lib/plugins/Plugin"));
__export(require("./lib/decorators"));
var entities_1 = require("./plugins/entities");
exports.entities = entities_1.default;
var resolvers_1 = require("./plugins/resolvers");
exports.resolvers = resolvers_1.default;
const nestbars = async (...plugins) => {
    await Promise.all(plugins.map(Plugin_1.default.registerPlugin));
    console.log('DONE', JSON.stringify(Plugin_1.default.all, null, 2));
};
exports.default = nestbars;
//# sourceMappingURL=index.js.map