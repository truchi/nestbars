"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("../utils");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const PARTIALS = 'partials';
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
        this.templates = [];
    }
    async loadTemplates() {
        const readPlugin = (file) => async () => await utils_1.readFile(path_1.resolve(this.pluginTemplates + '/' + file));
        const readUser = async (file) => await utils_1.readFile(path_1.resolve(this.userTemplates + '/' + file));
        this.templates = await Promise.all((await utils_1.readDir(this.pluginTemplates))
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
        this.partials = await Promise.all((await Promise.all([
            ...(await read(this.userTemplates
                ? path_1.resolve(this.userTemplates + '/' + PARTIALS)
                : undefined)),
            ...(await read(path_1.resolve(this.pluginTemplates + '/' + PARTIALS))),
        ]))
            .filter(({ name }, i, xs) => xs.findIndex(({ name: _name }) => name === _name) === i)
            .map(async ({ file, name }) => ({
            name: (({ dir, name: _name } = path_1.parse(name)) => ((dir ? dir + '/' : '') + _name)
                .replace('/', '__')
                .replace('.', '_'))(),
            partial: await utils_1.readFile(file),
        })));
    }
    async init() {
        await this.loadTemplates();
        await this.loadPartials();
        return this;
    }
    async generate() {
        return;
    }
    static async registerPlugin([plugin, options]) {
        const { name, templates: pluginTemplates, helpers: pluginHelpers, } = plugin();
        const { entities, dest, templates: userTemplates, helpers: userHelpers, } = options;
        Plugin.all.push(await new Plugin(name, entities, utils_1.toPathFunction(dest, ANCHORS), pluginTemplates, userTemplates, pluginHelpers, userHelpers).init());
    }
}
exports.default = Plugin;
Plugin.all = [];
//# sourceMappingURL=Plugin.js.map