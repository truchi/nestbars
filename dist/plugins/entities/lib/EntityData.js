"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../lib/utils");
const FieldData_1 = require("./FieldData");
class EntityData {
    constructor(entity, dest) {
        this.dest = dest;
        this.dbDecorator = 'Entity';
        this.gqlDecorator = 'ObjectType';
        this.entity = entity;
        const { fields, options } = entity;
        this.fields = fields.map(field => new FieldData_1.FieldData(field));
        this.dbOptions = Object.assign({}, utils_1.pick(options, ['name']), options.options);
        this.gqlOptions = utils_1.pick(options, ['description']);
    }
}
exports.EntityData = EntityData;
//# sourceMappingURL=EntityData.js.map