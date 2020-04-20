"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            const from = utils_1.relativeImport(this.entity.data().dest, Entity_1.Entity.find(name).data().dest);
            return { name, from };
        }));
    },
    enums() {
        return this.entity.fields.filter(({ type }) => type === decorators_1.FieldType.Enum || type === decorators_1.FieldType.Set);
    },
};
//# sourceMappingURL=helpers.js.map