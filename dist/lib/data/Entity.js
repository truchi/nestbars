"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = __importDefault(require("deep-freeze"));
const utils_1 = require("../utils");
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
        this.relations = [];
        this.fields = Field_1.Field.all.map(field => ((field.entity = this), field));
        Field_1.Field.all = [];
    }
    async init() {
        this.relations = utils_1.unique(this.fields.map(({ relation }) => relation).filter(x => x));
        return this;
    }
    filter(fn) {
        return this.fields.filter(fn);
    }
    by(...args) {
        return this.filter(field => field.is(...args));
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
        await Promise.all(Entity.all.map(async (entity) => (await Promise.all(entity.fields.map(async (field) => await field.init())),
            await entity.init())));
        deep_freeze_1.default(Entity);
        console.log(Entity.all);
        return Entity.all;
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map