"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Entity {
    constructor(name, options) {
        var _a;
        this.name = name;
        this.options = options;
        this.fields = [];
        this.options.options = (_a = this.options.options) !== null && _a !== void 0 ? _a : {};
    }
    dependencies() {
        return utils_1.unique(utils_1.flat(this.fields.map(field => field.dependencies()))).map(name => Entity.find(name));
    }
    dbOptions() {
        return this.options.options;
    }
    gqlOptions() {
        return { description: this.options.description || undefined };
    }
    fieldsByType(...types) {
        return this.fields.filter(({ type }) => types.includes(type));
    }
    static add(entity) {
        Entity.all.push(entity);
    }
    static find(name) {
        return Entity.all.find(entity => entity.name === name);
    }
}
exports.Entity = Entity;
Entity.all = [];
//# sourceMappingURL=Entity.js.map