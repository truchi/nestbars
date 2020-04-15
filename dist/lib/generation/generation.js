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
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const Entity_1 = require("../data/Entity");
const helpers_1 = __importDefault(require("./helpers"));
const partials = [
    'banner',
    'entity/imports',
    'entity/enum',
    'entity/db_decorator',
    'entity/gql_decorator',
    'entity/field/field',
    'entity/field/primary_db_decorator',
    'entity/field/primary_gql_decorator',
    'entity/field/scalar_db_decorator',
    'entity/field/scalar_gql_decorator',
    'entity/field/set_db_decorator',
    'entity/field/set_gql_decorator',
    'entity/field/special_db_decorator',
    'entity/field/special_gql_decorator',
    'entity/field/relation_db_decorator',
    'entity/field/relation_gql_decorator',
];
exports.generate = async (entities, templatesPath) => {
    await utils_2.registerPartials(partials, templatesPath);
    utils_2.registerHelpers(helpers_1.default);
    await Promise.all(entities.map(async (entity) => {
        const { dest, templatePath } = entity;
        await utils_1.writeFile(dest, HandleBars.compile(await utils_1.readFile(templatePath))({
            entities: Entity_1.Entity.all,
            entity,
        }));
    }));
};
//# sourceMappingURL=generation.js.map