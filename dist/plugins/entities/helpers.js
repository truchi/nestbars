"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dbImports() {
        const { hasJoinColumn, hasJoinTable } = this.entity.data();
    },
    gqlImports() {
        const { hasInt, hasFloat, hasEnum } = this.entity.data();
    },
};
//# sourceMappingURL=helpers.js.map