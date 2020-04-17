"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity = () => ({
    name: 'Nestbars Entities Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    context: (entities, dest) => {
        return {
            test: 'test',
        };
    },
});
exports.default = entity;
//# sourceMappingURL=index.js.map