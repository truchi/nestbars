"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = require("./lib/config");
const generation_1 = require("./lib/generation/generation");
const Entity_1 = require("./lib/data/Entity");
__export(require("./lib/decorators"));
const userRootPath = path_1.resolve();
const templatesPath = `${__dirname}/../src/templates`;
const userSrcPath = path_1.dirname(process.argv[1]);
exports.default = async (userConfig) => {
    const config = await config_1.sanitizeConfig(userConfig, userRootPath, templatesPath, userSrcPath);
    await generation_1.generate(Entity_1.Entity.init(config), templatesPath);
};
//# sourceMappingURL=index.js.map