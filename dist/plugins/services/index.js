"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity = () => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    context: (entities, dest) => entities.reduce((o, { name }) => ({ ...o, [name]: dest('entity', name) }), {}),
});
exports.default = entity;
//# sourceMappingURL=index.js.map