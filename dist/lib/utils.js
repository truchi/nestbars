"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
const path_1 = require("path");
exports.readFile = (file) => util_1.promisify(fs_1.readFile)(file, 'utf8');
exports.readDir = (dir) => util_1.promisify(fs_1.readdir)(dir, 'utf8');
exports.writeFile = ((writeFile = util_1.promisify(fs_1.writeFile)) => (file, content) => exports.mkdir(path_1.dirname(file))
    .then(() => writeFile(file, content)))();
exports.mkdir = (path) => util_1.promisify(fs_1.mkdir)(path, { recursive: true });
exports.flat = (xs) => [].concat(...xs);
exports.unique = (xs) => xs.filter((x, i, xs) => xs.indexOf(x) === i);
exports.uniqueBy = (key) => (xs) => xs.filter((x, i, xs) => xs.findIndex(y => x[key] === y[key]) === i);
exports.assign = (x, ...xs) => Object.assign.apply(Object, [{}, x, ...xs]);
exports.pick = (o, keys) => Object.entries(o).reduce((o, [k, v]) => (keys.includes(k) ? { ...o, [k]: v } : o), {});
exports.rename = (o, names) => Object.entries(o).reduce((o, [k, v]) => { var _a; return ({ ...o, [(_a = names[k]) !== null && _a !== void 0 ? _a : k]: v }); }, {});
exports.uncapitalize = (s) => s.charAt(0).toLowerCase() + s.slice(1);
exports.toPathFunction = (o, { NAME, TYPE }) => {
    const fn = typeof o === 'string' ? (() => o) : o;
    return (type, name) => path_1.normalize(fn(type, name)
        .replace(TYPE, type)
        .replace(NAME, name));
};
exports.assertNever = (x, file, reason) => {
    throw new Error(`Missing case in ${file} (${reason}) for:\n${x}\n${JSON.stringify(x, null, 2)}`);
};
//# sourceMappingURL=utils.js.map