"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("./Data");
exports.FIELD_DATA = new Data_1.Data();
class Field {
    constructor(entity, name, type, options) {
        this.entity = entity;
        this.name = name;
        this.type = type;
        this.options = options;
    }
    data() {
        return exports.FIELD_DATA.get(`${this.entity}:${this.name}`);
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map