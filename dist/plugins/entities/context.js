"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityData_1 = require("./lib/EntityData");
exports.default = (entities, dest) => () => entities.map(entity => new EntityData_1.EntityData(entity, dest('entity', entity.name)));
//# sourceMappingURL=context.js.map