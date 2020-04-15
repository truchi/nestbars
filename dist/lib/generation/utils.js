"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandleBars = __importStar(require("handlebars"));
const utils_1 = require("../utils");
exports.registerPartials = async (partials, templatesPath) => Promise.all(partials.map(async (partial) => HandleBars.registerPartial(partial.replace(/\//g, '__'), await utils_1.readFile(`${templatesPath}/${partial}.hbs`))));
exports.registerHelpers = (helpers) => Object.entries(helpers).map(([name, helper]) => HandleBars.registerHelper(name, helper));
//# sourceMappingURL=utils.js.map