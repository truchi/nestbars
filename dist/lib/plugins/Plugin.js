"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const HandleBars = __importStar(require("handlebars"));
const utils_1 = require("../utils");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const PARTIALS = 'partials';
const ANCHORS = {
    NAME: '[name]',
    TYPE: '[type]',
};
class Plugin {
    constructor(name, entities, dest, pluginTemplates, userTemplates, pluginHelpers = {}, userHelpers = {}) {
        this.name = name;
        this.entities = entities;
        this.dest = dest;
        this.pluginTemplates = pluginTemplates;
        this.userTemplates = userTemplates;
        this.pluginHelpers = pluginHelpers;
        this.userHelpers = userHelpers;
        this.templates = [];
        this.partials = [];
        this.helpers = {};
    }
    async loadTemplates() {
        const readPlugin = (file) => async () => await utils_1.readFile(path_1.resolve(this.pluginTemplates + '/' + file));
        const readUser = async (file) => await utils_1.readFile(path_1.resolve(this.userTemplates + '/' + file));
        return await Promise.all((await utils_1.readDir(this.pluginTemplates))
            .filter(file => file !== PARTIALS)
            .map(async (file) => ({
            type: path_1.parse(file).name,
            template: this.userTemplates
                ? await readUser(file).catch(readPlugin(file))
                : await readPlugin(file)(),
        })));
    }
    async loadPartials() {
        const read = (dir) => recursive_readdir_1.default(dir)
            .catch(() => [])
            .then((files) => files.map(file => ({ file, name: file.replace(dir + '/', '') })));
        return await Promise.all(utils_1.uniqueBy('name')(await Promise.all([
            ...(await read(this.userTemplates
                ? path_1.resolve(this.userTemplates + '/' + PARTIALS)
                : undefined)),
            ...(await read(path_1.resolve(this.pluginTemplates + '/' + PARTIALS))),
        ])).map(async ({ file, name }) => ({
            name: (({ dir, name: _name } = path_1.parse(name)) => ((dir ? dir + '/' : '') + _name)
                .replace('/', '__')
                .replace('.', '_'))(),
            partial: await utils_1.readFile(file),
        })));
    }
    loadHelpers() {
        return [
            ...Object.entries(this.pluginHelpers),
            ...Object.entries(this.userHelpers),
        ].reduce((helpers, [name, fn]) => ({ ...helpers, [name]: fn }), {});
    }
    async init() {
        this.templates = await this.loadTemplates();
        this.partials = await this.loadPartials();
        this.helpers = this.loadHelpers();
        return this;
    }
    async generate() {
        Plugin.load(this);
        Plugin.unload(this);
        return;
    }
    static load(plugin) {
        Object.entries(plugin.helpers).map(([name, helper]) => HandleBars.registerHelper(name, helper));
        plugin.partials.map(({ name, partial }) => HandleBars.registerPartial(name, partial));
    }
    static unload(plugin) {
        Object.entries(plugin.helpers).map(([name]) => HandleBars.unregisterHelper(name));
        plugin.partials.map(({ name }) => HandleBars.unregisterPartial(name));
    }
    static async register([plugin, options]) {
        const { name, templates: pluginTemplates, helpers: pluginHelpers, } = plugin();
        const { entities, dest, templates: userTemplates, helpers: userHelpers, } = options;
        Plugin.all.push(await new Plugin(name, entities, utils_1.toPathFunction(dest, ANCHORS), pluginTemplates, userTemplates, pluginHelpers, userHelpers).init());
    }
}
exports.default = Plugin;
Plugin.all = [];
//# sourceMappingURL=Plugin.js.map