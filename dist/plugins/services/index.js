"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const Plugin_1 = require("../../lib/plugins/Plugin");
const entity = ({ entities: entitiesDest }) => (entities, dest) => ({
    name: 'Nestbars Services Plugin',
    templates: (__dirname + '/templates').replace('/dist/', '/src/'),
    context: () => entities.reduce((o, { name }) => ({
        ...o,
        [name]: {
            dest: dest('service', name),
            entityDest: utils_1.toPathFunction(entitiesDest, Plugin_1.ANCHORS)('entity', name),
        },
    }), {}),
});
exports.default = entity;
//# sourceMappingURL=index.js.map