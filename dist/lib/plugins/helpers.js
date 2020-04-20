"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandleBars = __importStar(require("handlebars"));
const handlebars_helpers_1 = __importDefault(require("handlebars-helpers"));
const object_path_1 = require("object-path");
const utils_1 = require("../utils");
let SWITCHES = [];
let VARS = {};
exports.reset = () => void ((SWITCHES = []), (VARS = {}));
const helpers = {
    ...handlebars_helpers_1.default(),
    switch(value, { fn }) {
        SWITCHES.push({ value, break: false });
        const ret = fn(this);
        SWITCHES.pop();
        return ret;
    },
    case(...args) {
        const { fn } = args.pop();
        const _switch = SWITCHES[SWITCHES.length - 1];
        return args.includes(_switch.value)
            ? ((_switch.break = true), fn(this))
            : '';
    },
    default({ fn }) {
        return SWITCHES[SWITCHES.length - 1].break ? '' : fn(this);
    },
    call(o, fn, ...args) {
        return o[fn](...args);
    },
    $get(path) {
        return object_path_1.get(VARS, path);
    },
    $set(path, data) {
        object_path_1.set(VARS, path, data);
    },
    $empty(path) {
        object_path_1.empty(VARS, path);
    },
    $del(path) {
        object_path_1.del(VARS, path);
    },
    $has(path) {
        return object_path_1.has(VARS, path);
    },
    $insert(path, data, index) {
        object_path_1.insert(VARS, path, data, index);
    },
    $push(path, data) {
        object_path_1.push(VARS, path, data);
    },
    $ensureExists(path, dft) {
        object_path_1.ensureExists(VARS, path, dft);
    },
    $coalesce(paths, dft) {
        object_path_1.coalesce(VARS, paths, dft);
    },
    uncapitalize(str) {
        return utils_1.uncapitalize(str);
    },
    stringify(o, { hash: { trap = true, indent = 2 } }) {
        if (trap && !Object.keys(o).length)
            return new HandleBars.SafeString('');
        return new HandleBars.SafeString(indent ? JSON.stringify(o, null, indent) : JSON.stringify(o));
    },
};
exports.default = helpers;
//# sourceMappingURL=helpers.js.map