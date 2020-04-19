"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = require("./Type");
class Field {
    constructor(entity, name, type, options) {
        this.entity = entity;
        this.name = name;
        this.options = options;
        this.type = Type_1.TypeFactory(type, entity);
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map