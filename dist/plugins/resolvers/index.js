"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity = (entities, dest) => ({
    name: 'Nestbars Resolvers Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    context: () => entities.reduce((o, { name }) => ({ ...o, [name]: dest('resolver', name) }), {}),
});
exports.default = entity;
//# sourceMappingURL=index.js.map