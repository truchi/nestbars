"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
const Entity_1 = require("../../lib/data/Entity");
exports.default = {
    dbImports() {
        const { hasJoinColumn, hasJoinTable } = this.entity.data();
        return [
            'Entity',
            ...utils_1.unique(this.entity.fields.map(field => field.data().dbDecorator)),
            ...(hasJoinColumn ? ['JoinColumn'] : []),
            ...(hasJoinTable ? ['JoinTable'] : []),
        ]
            .sort()
            .join(',');
    },
    gqlImports() {
        const { hasInt, hasFloat, hasEnum } = this.entity.data();
        return [
            'ObjectType',
            ...utils_1.unique(this.entity.fields.map(field => field.data().gqlDecorator)),
            ...(hasInt ? ['Int'] : []),
            ...(hasFloat ? ['Float'] : []),
            ...(hasEnum ? ['registerEnumType'] : []),
        ]
            .sort()
            .join(',');
    },
    dependencies() {
        return utils_1.uniqueBy('name')(this.entity
            .fieldsByType(decorators_1.FieldType.OneToOne, decorators_1.FieldType.OneToMany, decorators_1.FieldType.ManyToOne, decorators_1.FieldType.ManyToMany)
            .map(field => {
            const name = field.options.withEntity().name;
            const { dir: fromDir } = path_1.parse(this.entity.data().dest);
            const { dir: toDir, name: toName } = path_1.parse(Entity_1.Entity.find(name).data().dest);
            const from = path_1.relative(fromDir, toDir) + '/' + toName;
            return { name, from };
        }));
    },
    enums() {
        return this.entity.fields.filter(({ type }) => type === decorators_1.FieldType.Enum || type === decorators_1.FieldType.Set);
    },
    entityData() {
        return this.entity.data();
    },
    fieldData(field) {
        return field.data();
    },
};
//# sourceMappingURL=helpers.js.map