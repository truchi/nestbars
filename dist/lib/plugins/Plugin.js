"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const HandleBars = __importStar(require("handlebars"));
const utils_1 = require("../utils");
const helpers_1 = __importStar(require("./helpers"));
const Entity_1 = require("../data/Entity");
const Field_1 = require("../data/Field");
exports.PARTIALS = 'partials';
exports.ANCHORS = {
    NAME: '[name]',
    TYPE: '[type]',
};
class Plugin {
    constructor(entities, dest, pluginTemplates, userTemplates, pluginHelpers, userHelpers, pluginContext, userContext, pluginData, userData) {
        this.entities = entities;
        this.dest = dest;
        this.pluginTemplates = pluginTemplates;
        this.userTemplates = userTemplates;
        this.pluginHelpers = pluginHelpers;
        this.userHelpers = userHelpers;
        this.pluginContext = pluginContext;
        this.userContext = userContext;
        this.pluginData = pluginData;
        this.userData = userData;
        this.templates = [];
        this.partials = [];
        this.helpers = {};
    }
    async loadTemplates() {
        const readPlugin = (file) => async () => await utils_1.readFile(path_1.resolve(this.pluginTemplates + '/' + file));
        const readUser = async (file) => await utils_1.readFile(path_1.resolve(this.userTemplates + '/' + file));
        return await Promise.all((await utils_1.readDir(this.pluginTemplates))
            .filter(file => file !== exports.PARTIALS)
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
                ? path_1.resolve(this.userTemplates + '/' + exports.PARTIALS)
                : undefined)),
            ...(await read(path_1.resolve(this.pluginTemplates + '/' + exports.PARTIALS))),
        ])).map(async ({ file, name }) => ({
            name: (({ dir, name: _name } = path_1.parse(name)) => ((dir ? dir + '/' : '') + _name)
                .replace(/\//g, '__')
                .replace(/\./g, '_'))(),
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
        const generate = (entity) => async ({ type, template }) => (helpers_1.reset(),
            await utils_1.writeFile(this.dest(type, entity.name), HandleBars.compile(template)({
                type,
                entities: Entity_1.Entity.all,
                entity,
                context: {
                    ...this.pluginContext(),
                    ...this.userContext(),
                },
            })));
        await Promise.all(this.entities.map(async (entity) => Promise.all(this.templates.map(generate(entity)))));
    }
    static async register([plugin, options]) {
        const { classes, dest: _dest, templates: userTemplates, helpers: userHelpers, context: userContext, data: userData, } = options;
        const names = classes.map(({ name }) => name);
        const entities = Entity_1.Entity.all.filter(({ name }) => names.includes(name));
        const dest = utils_1.toPathFunction(_dest, exports.ANCHORS);
        const { templates: pluginTemplates, helpers: pluginHelpers, context: pluginContext, data: pluginData, } = plugin(entities, dest);
        Plugin.all.push(await new Plugin(entities, dest, pluginTemplates, userTemplates || '', pluginHelpers || {}, userHelpers || {}, pluginContext || (() => ({})), userContext || (() => ({})), {
            entity: (pluginData === null || pluginData === void 0 ? void 0 : pluginData.entity) || (() => ({})),
            field: (pluginData === null || pluginData === void 0 ? void 0 : pluginData.field) || (() => ({})),
        }, {
            entity: (userData === null || userData === void 0 ? void 0 : userData.entity) || (() => ({})),
            field: (userData === null || userData === void 0 ? void 0 : userData.field) || (() => ({})),
        }).init());
    }
    static async generate() {
        Plugin.all.map(plugin => {
            Object.entries(helpers_1.default).map(([name, helper]) => HandleBars.registerHelper(name, helper));
            plugin.entities.map(entity => (entity.fields.map(field => Field_1.set(field, {
                ...plugin.pluginData.field(field),
                ...plugin.userData.field(field),
            })),
                Entity_1.set(entity, {
                    ...plugin.pluginData.entity(entity),
                    ...plugin.userData.entity(entity),
                })));
            Object.entries(plugin.helpers).map(([name, helper]) => HandleBars.registerHelper(name, helper));
            plugin.partials.map(({ name, partial }) => HandleBars.registerPartial(name, partial));
            plugin.generate();
            Object.entries(plugin.helpers).map(([name]) => HandleBars.unregisterHelper(name));
            plugin.partials.map(({ name }) => HandleBars.unregisterPartial(name));
            Entity_1.reset();
            Field_1.reset();
        });
    }
}
exports.default = Plugin;
Plugin.all = [];
//# sourceMappingURL=Plugin.js.map