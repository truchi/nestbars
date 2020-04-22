"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity_1 = __importDefault(require("./entity"));
exports.default = ({ entities: entitiesPath, services: servicesPath, }) => (entities, resolversPath) => ({
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    data: {
        entity: entity_1.default(utils_1.toPathFunction(entitiesPath, Plugin_1.ANCHORS), utils_1.toPathFunction(servicesPath, Plugin_1.ANCHORS), resolversPath),
    },
});
//# sourceMappingURL=index.js.map