"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./lib/data/Entity");
const Plugin_1 = __importDefault(require("./lib/plugins/Plugin"));
__export(require("./lib/decorators"));
var entities_1 = require("./plugins/entities");
exports.entities = entities_1.default;
var resolvers_1 = require("./plugins/resolvers");
exports.resolvers = resolvers_1.default;
var services_1 = require("./plugins/services");
exports.services = services_1.default;
const nestbars = async (...plugins) => {
    Plugin_1.default.entities = await Entity_1.Entity.init();
    await Promise.all(plugins.map(Plugin_1.default.register));
    await Plugin_1.default.generate();
};
exports.default = nestbars;
//# sourceMappingURL=index.js.map