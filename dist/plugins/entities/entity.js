"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const utils_1 = require("../../lib/utils");
exports.default = (entitiesPath) => (type, entity) => {
    const has = (type) => !!entity.fields.filter(field => field.data()[type]).length;
    const entityPath = entitiesPath(type, entity.name);
    const enums = entity.by(decorators_1.SetOptions);
    const relations = utils_1.unique(entity
        .by(decorators_1.RelationOptions)
        .map(field => field.data().relation)
        .filter(x => x));
    const fieldDbDecorators = utils_1.unique(entity.fields.map(field => field.data().dbDecorator));
    const hasFields = !!entity.fields.length;
    const hasEnums = !!enums.length;
    const hasInt = has('isGqlInt');
    const hasFloat = has('isGqlFloat');
    const hasJoinColumn = has('hasJoinColumn');
    const hasJoinTable = has('hasJoinTable');
    const dbOptions = Object.assign(utils_1.pick(entity.options, ['name']), entity.options.options);
    const gqlOptions = utils_1.pick(entity.options, ['description']);
    return {
        entityPath,
        enums,
        relations,
        fieldDbDecorators,
        hasFields,
        hasEnums,
        hasInt,
        hasFloat,
        hasJoinColumn,
        hasJoinTable,
        dbOptions,
        gqlOptions,
    };
};
//# sourceMappingURL=entity.js.map