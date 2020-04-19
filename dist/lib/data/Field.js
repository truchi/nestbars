"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(entity, name, type, options) {
        this.entity = entity;
        this.name = name;
        this.type = type;
        this.options = options;
    }
    static add(field) {
        Field.all.push(field);
    }
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map