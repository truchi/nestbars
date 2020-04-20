"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let FIELD_DATA = {};
exports.get = (field) => FIELD_DATA[`${field.entity}:${field.name}`];
exports.set = (field, data) => void (FIELD_DATA[`${field.entity}:${field.name}`] = data);
exports.reset = () => void (FIELD_DATA = {});
class Field {
    constructor(entity, name, type, options) {
        this.entity = entity;
        this.name = name;
        this.type = type;
        this.options = options;
    }
    data() {
        return exports.get(this);
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map