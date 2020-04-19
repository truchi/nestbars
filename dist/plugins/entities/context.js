"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entities, dest) => () => entities.reduce((o, { name }) => ({ ...o, [name]: dest('entity', name) }), {});
//# sourceMappingURL=context.js.map