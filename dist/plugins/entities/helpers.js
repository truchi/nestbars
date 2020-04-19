"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
exports.default = (entities, dest) => ({
    enums(entity) {
        return entity.fields.filter(({ type }) => type === decorators_1.FieldType.Enum || type === decorators_1.FieldType.Set);
    },
    hasJoinColumn(entity) {
        return !!entity
            .fieldsByType(decorators_1.FieldType.OneToOne, decorators_1.FieldType.ManyToOne)
            .filter(({ options }) => !!options.joinColumn)
            .length;
    },
    hasJoinTable(entity) {
        return !!entity
            .fieldsByType(decorators_1.FieldType.ManyToMany)
            .filter(({ options }) => !!options.joinTable)
            .length;
    },
});
//# sourceMappingURL=helpers.js.map