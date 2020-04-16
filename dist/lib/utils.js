"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = require("path");
exports.readFile = (file) => util_1.promisify(fs_1.readFile)(file, 'utf8');
exports.writeFile = ((writeFile = util_1.promisify(fs_1.writeFile)) => (file, content) => exports.mkdir(path_1.dirname(file))
    .then(() => writeFile(file, content)))();
exports.mkdir = (path) => util_1.promisify(fs_1.mkdir)(path, { recursive: true });
exports.toPathFunction = (o, { NAME, TYPE }) => {
    const fn = typeof o === 'string' ? (() => o) : o;
    return (type, name) => path_1.normalize(fn(type, name)
        .replace(TYPE, type)
        .replace(NAME, name));
};
exports.flat = (xs) => [].concat(...xs);
exports.unique = (xs) => xs.filter((x, i, xs) => xs.indexOf(x) === i);
exports.defined = (xs) => xs.filter(x => x);
exports.assign = (x, ...xs) => Object.assign.apply(Object, [{}, x, ...xs]);
exports.uncapitalize = (s) => s.charAt(0).toLowerCase() + s.slice(1);
//# sourceMappingURL=utils.js.map