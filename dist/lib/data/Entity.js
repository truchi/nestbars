"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = __importDefault(require("deep-freeze"));
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../utils");
const Field_1 = require("./Field");
let ENTITY_DATA = {};
exports.get = (entity) => ENTITY_DATA[entity.name];
exports.set = (entity, data) => void (ENTITY_DATA[entity.name] = data);
exports.reset = () => void (ENTITY_DATA = {});
class Entity {
    constructor(name, options) {
        var _a;
        this.name = name;
        this.options = options;
        this.fields = [];
        this.dependencies = [];
        this.options.options = (_a = this.options.options) !== null && _a !== void 0 ? _a : {};
    }
    async init() {
        await 0;
        this.dependencies = utils_1.unique(this.byType(decorators_1.FieldType.OneToOne, decorators_1.FieldType.OneToMany, decorators_1.FieldType.ManyToOne, decorators_1.FieldType.ManyToMany).map(field => field.options.withEntity().name)).map(Entity.find);
        return this;
    }
    filter(fn) {
        return this.fields.filter(fn);
    }
    byType(...types) {
        return this.filter(({ type }) => types.includes(type));
    }
    data() {
        return exports.get(this);
    }
    static add(entity) {
        Entity.all.push(entity);
    }
    static find(name) {
        return Entity.all.find(entity => entity.name === name);
    }
    static async init() {
        const map = Entity.all.reduce((map, entity) => ({
            ...map,
            [entity.name]: entity,
        }), {});
        await Promise.all(Field_1.Field.all.map(async (field) => map[field.entity].fields.push(await field.init())));
        await Promise.all(Entity.all.map(async (entity) => await entity.init()));
        deep_freeze_1.default(Entity);
        return Entity.all;
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map