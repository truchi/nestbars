"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("./utils");
const Entity_1 = require("./Entity");
let FIELD_DATA = {};
exports.get = (field) => FIELD_DATA[`${field.entity}:${field.name}`];
exports.set = (field, data) => void (FIELD_DATA[`${field.entity}:${field.name}`] = data);
exports.reset = () => void (FIELD_DATA = {});
class Field {
    constructor(name, type, options) {
        this.name = name;
        this.type = type;
        this.options = options;
        this.isPrimary = this.is(decorators_1.PrimaryOptions) || !!options.primary;
        this.isGenerated = this.is(decorators_1.PrimaryOptions, decorators_1.SpecialOptions);
        this.isRelation = this.is(decorators_1.RelationOptions);
    }
    async init() {
        let name = '';
        if (this.options instanceof decorators_1.SetOptions) {
            name = this.options.name;
        }
        if (this.options instanceof decorators_1.RelationOptions) {
            name = this.options.withEntity().name;
            this.relation = Entity_1.Entity.find(name);
        }
        this.tsType = utils_1.tsType(this.type, name);
        this.dbType = utils_1.dbType(this.type, name);
        this.gqlType = utils_1.gqlType(this.type, name);
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
}
exports.Field = Field;
Field.all = [];
//# sourceMappingURL=Field.js.map