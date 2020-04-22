"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entityData_1 = __importDefault(require("./entityData"));
exports.default = ({ entities: entitiesPath }) => (entities, servicesPath) => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    entityData: entityData_1.default(utils_1.toPathFunction(entitiesPath, Plugin_1.ANCHORS), servicesPath),
});
//# sourceMappingURL=index.js.map