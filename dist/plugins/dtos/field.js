"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../types/decorators");
const field_1 = __importDefault(require("../entities/field"));
exports.default = (type, field) => {
    const data = field_1.default('entity', field);
    const isPrimary = field.is(decorators_1.PrimaryOptions) || !!field.options.primary;
    const isGenerated = field.is(decorators_1.PrimaryOptions, decorators_1.SpecialOptions);
    const isData = !isPrimary &&
        !isGenerated &&
        (!field.is(decorators_1.FieldType.OneToOne) || data.hasJoinColumn) &&
        !field.is(decorators_1.FieldType.OneToMany) &&
        (!field.is(decorators_1.FieldType.ManyToMany) || data.hasJoinTable);
    const partialGqlOptions = {
        ...data.gqlOptions,
        nullable: true,
        defaultValue: undefined,
    };
    return {
        ...data,
        isPrimary,
        isData,
        partialGqlOptions,
    };
};
//# sourceMappingURL=field.js.map