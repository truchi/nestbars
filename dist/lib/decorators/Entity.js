"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../data/Entity");
exports.Entity = (options = {}) => ({ name }) => Entity_1.Entity.add(new Entity_1.Entity(name, options));
//# sourceMappingURL=Entity.js.map