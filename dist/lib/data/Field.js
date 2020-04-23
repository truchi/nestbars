"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
let FIELD_DATA = {};
exports.get = (field) => FIELD_DATA[`${field.entity}:${field.name}`];
exports.set = (field, data) => void (FIELD_DATA[`${field.entity}:${field.name}`] = data);
exports.reset = () => void (FIELD_DATA = {});
class Field {
    constructor(_entity, name, type, options) {
        this._entity = _entity;
        this.name = name;
        this.type = type;
        this.options = options;
    }
    async init() {
        this.entity = Entity_1.Entity.find(this._entity);
        return this;
    }
    is(...args) {
        return args.some(arg => arg instanceof Function
            ? this.options instanceof arg
            : this.type === arg);
    }
    data() {
        return exports.get(this);
    }
    static add(field) {
        Field.all.push(field);
    }
    static init() {
        Field.all.map(field => field.init());
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map