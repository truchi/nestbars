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
const utils_1 = require("../utils");
const SWITCHES = [];
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
    call(o, fn, ...args) {
        return o[fn](...args);
    },
    uncapitalize(str) {
        return utils_1.uncapitalize(str);
    },
    stringify(o, { hash: { except, trap } }) {
        except = !!except ? (Array.isArray(except) ? except : [except]) : [];
        trap = !!trap ? (Array.isArray(trap) ? trap : [trap]) : [];
        trap = trap.map(s => s.trim());
        let str = JSON.stringify(o);
        except.map(key => {
            str = str.replace(`\"${key}\":\"${o[key]}"`, `\"${key}\":${o[key]}`);
        });
        str = trap.includes(str.trim()) ? '' : str;
        return new HandleBars.SafeString(str);
    },
};
exports.default = helpers;
//# sourceMappingURL=helpers.js.map