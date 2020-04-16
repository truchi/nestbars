"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("../utils");
const ANCHORS = {
    NAME: '[name]',
    TYPE: '[type]',
};
class Plugin {
    constructor(name, entities, dest, pluginTemplates, userTemplates, pluginHelpers = [], userHelpers = []) {
        this.name = name;
        this.entities = entities;
        this.dest = dest;
        this.pluginTemplates = pluginTemplates;
        this.userTemplates = userTemplates;
        this.pluginHelpers = pluginHelpers;
        this.userHelpers = userHelpers;
    }
    static registerPlugin(plugin, options) {
        const { name, templates: pluginTemplates, helpers: pluginHelpers, } = plugin();
        const { entities, dest, templates: userTemplates, helpers: userHelpers, } = options;
        Plugin.all.push(new Plugin(name, entities, utils_1.toPathFunction(dest, ANCHORS), path_1.normalize(pluginTemplates), path_1.normalize(userTemplates), pluginHelpers, userHelpers));
    }
}
exports.default = Plugin;
Plugin.all = [];
//# sourceMappingURL=Plugin.js.map