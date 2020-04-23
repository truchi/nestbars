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
        this.name = name;
        this.options = options;
        this.fields = [];
    }
    by(...args) {
        return this.fields.filter(field => field.is(...args));
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
        await 0;
        Field_1.Field.init();
        Entity.all.forEach(entity => (entity.fields = Field_1.Field.all.filter(field => field.entity === entity)));
        deep_freeze_1.default(Entity);
        return Entity.all;
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map