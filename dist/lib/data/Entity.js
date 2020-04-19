"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = __importDefault(require("deep-freeze"));
const utils_1 = require("../utils");
const Field_1 = require("./Field");
class Entity {
    constructor(name, options) {
        var _a;
        this.name = name;
        this.options = options;
        this.fields = [];
        this.options.options = (_a = this.options.options) !== null && _a !== void 0 ? _a : {};
    }
    dependencies() {
        return utils_1.unique(utils_1.flat(this.fields.map(field => field.type.deps)))
            .map(name => Entity.find(name));
    }
    dbOptions() {
        return this.options.options;
    }
    gqlOptions() {
        return { description: this.options.description || undefined };
    }
    fieldsByType(...types) {
        return this.fields.filter(({ type: { type } }) => types.includes(type));
    }
    static add(entity) {
        Entity.all.push(entity);
    }
    static find(name) {
        return Entity.all.find(entity => entity.name === name);
    }
    static init() {
        const map = Entity.all.reduce((map, entity) => ({
            ...map,
            [entity.name]: entity,
        }), {});
        Field_1.Field.all.map(field => map[field.entity].fields.push(field));
        deep_freeze_1.default(Entity);
        return Entity.all;
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map