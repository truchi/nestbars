"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const ANCHORS = {
    NAME: '[name]',
    TYPE: '[type]',
};
const DEFAULTS = {
    entities: [],
    dest: `${ANCHORS.NAME}/${ANCHORS.TYPE}.ts`,
    templates: `${ANCHORS.TYPE}/main.hbs`,
};
exports.sanitizeConfig = async (userConfig, userRootPath, nestbarsTemplatesPath, userSrcPath) => {
    const destPath = userConfig.dest !== undefined ? userRootPath : userSrcPath;
    const templatesPath = userConfig.templates !== undefined ? userRootPath : nestbarsTemplatesPath;
    userConfig = utils_1.assign(DEFAULTS, userConfig);
    return utils_1.assign(userConfig, {
        dest: utils_1.toPathFunction(userConfig.dest, ANCHORS, destPath),
        templates: utils_1.toPathFunction(userConfig.templates, ANCHORS, templatesPath),
    });
};
//# sourceMappingURL=config.js.map