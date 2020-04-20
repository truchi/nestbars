"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = __importDefault(require("deep-freeze"));
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
        this.options.options = (_a = this.options.options) !== null && _a !== void 0 ? _a : {};
    }
    fieldsByType(...types) {
        return this.fields.filter(({ type }) => types.includes(type));
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