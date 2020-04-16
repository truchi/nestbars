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
    plugins.map(([plugin, options]) => Plugin_1.default.registerPlugin(plugin, options));
    await Promise.all(Plugin_1.default.all.map(plugin => plugin.generate()));
    console.log('DONE');
};
exports.default = nestbars;
//# sourceMappingURL=index.js.map